const faceapi = require('face-api.js');
const canvas = require('canvas');
const MODEL_URL = 'Models/weights';

const faceDetection = async (imageReques) => {
    await loadModels();

    console.log(imageReques)
    const image = await loadImage(`${imageReques.path}`);

    const labels = ['Pedro Gabriel', 'Luis Fernando', 'Felipe Antonio'];

    const labeledFaceDescriptors =  await Promise.all(
        labels.map(async (label) => {
          return await loadFaceImages(label);
        })
    );

    const results = await compareFace(image, labeledFaceDescriptors);
    console.log("***************************************************************************");
    console.log(results);
    console.log("***************************************************************************");

    return results.label;

};

// Load Models
const loadModels = async () => {
    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    const models = [
        faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL),
    ];

    return await Promise.all(models);
};

// Load Image
const loadImage = async path => {
    return await canvas.loadImage(path);
}

// Detect face the image
const detectFace = async (image) => {
    return await faceapi
        .detectSingleFace(image)
        .withFaceLandmarks()
        .withFaceDescriptor();
};

// Load the images
const loadFaceImages = async (label) => {
    const descriptions = [];
    try {
      for (let i = 1; i <= 5; i++) {
        const img = await loadImage(`images/${label}/${i}.jpg`);
        console.log(img)
        const detections = await faceapi.detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
    } catch (error) {
      console.log(error);
    }
    return new faceapi.LabeledFaceDescriptors(label, descriptions);
};

// Compare the faces
const compareFace = async (image, labeledFaceDescriptors) => {
    const maxDescriptorDistance = 0.6;

    // const detection = await detectFace(image);

    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance);
   
    const results = faceMatcher.findBestMatch(image.descriptor);

    return results;
}

module.exports = faceDetection;