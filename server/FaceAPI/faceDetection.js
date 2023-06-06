const faceapi = require('face-api.js');
const canvas = require('canvas');
const fs = require('fs');
const path = require('path');
const MODEL_URL = 'Models/weights';
const folderName = `Database`;
const filePath = 'database.json';

const faceDetection = async (imageReques) => {
    await loadModels();

    console.log(imageReques)
    const image = await loadImage(`${imageReques.path}`);
    console.log(image);

    if (!fs.existsSync(folderName)) {
      await writeDatabase();
    }
    const labeledFaceDescriptors = await Promise.all(await getDatabase());
    
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
      faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_URL),
      faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromDisk(MODEL_URL)
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
        if(detections){
          descriptions.push(detections.descriptor);
        }
      }
    } catch (error) {
      console.log(error);
    }
    // return new faceapi.LabeledFaceDescriptors(label, descriptions);
    if (descriptions.length > 0) {
      // Create the labeled face descriptors
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    } else {
      // Return null or handle the case when no descriptors were loaded
      return null;
    }
};

const writeDatabase = async () => {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    const labels = ['Pedro Gabriel', 'Luis Fernando', 'Felipe Antonio'];

    const labeledFaceDescriptors =  await Promise.all(
        labels.map(async (label) => {
          return await loadFaceImages(label);
        })
    );
    const database = JSON.stringify(labeledFaceDescriptors);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(`Database/${filePath}`,database, err => console.log(err));
    }else{
      fs.writeFileSync(`Database/${filePath}`,database, err => console.log(err));
    }
  }
}

// Load Database
const getDatabase = async () => {
  const databaseString = fs.readFileSync(`${folderName}/${filePath}`,{
    encoding: 'utf8',
    flag: 'r'
  });

  const database = JSON.parse(databaseString);

  return await database.map(async person => {
    const descriptions = [];
    person.descriptors.map(descriptor => {
      const float32Array = new Float32Array(descriptor);
      descriptions.push(float32Array);
    });
    return new faceapi.LabeledFaceDescriptors(person.label, descriptions);
  });
}

// Compare the faces
const compareFace = async (image, labeledFaceDescriptors) => {
    const maxDescriptorDistance = 0.6;

    if(!labeledFaceDescriptors){
      return null;
    }

    const detection = await detectFace(image);
    console.log('[IMAGE COMPARE]', image);
    console.log('[LABEL COMPARE]', labeledFaceDescriptors);

    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance);
   
    const results = faceMatcher.findBestMatch(detection.descriptor);

    return results;
}

module.exports = faceDetection;