const { nets, env, detectSingleFace, withFaceLandmarks, withFaceDescriptor, FaceMatcher, LabeledFaceDescriptors } = require('face-api.js');
const canvas = require('canvas');
const fs = require('fs');
const path = require('path');
const MODEL_URL = 'Models/weights';
const folderName = `Database`;
const filePath = 'database.json';
let modelsLoad = false;

const faceDetection = async (imageReques) => {
  if(!modelsLoad){
    await loadModels();
    modelsLoad = true;
  }

  console.log(imageReques);
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
const loadModels = () => {
  const { Canvas, Image, ImageData } = canvas;
  env.monkeyPatch({ Canvas, Image, ImageData });

  const models = [
    nets.tinyFaceDetector.loadFromDisk(MODEL_URL),
    nets.ssdMobilenetv1.loadFromDisk(MODEL_URL),
    nets.faceLandmark68Net.loadFromDisk(MODEL_URL),
    nets.faceRecognitionNet.loadFromDisk(MODEL_URL),
    nets.faceExpressionNet.loadFromDisk(MODEL_URL)
  ];

  return Promise.all(models);
};


// Load Image
const loadImage = async path => {
    return await canvas.loadImage(path);
}

// Detect face the image
const detectFace = async (image) => {
    return await detectSingleFace(image)
        .withFaceLandmarks()
        .withFaceDescriptor();
};

// Load the images
const loadFaceImages = async label => {
  const descriptions = [];
  try {
    const loadImagePromises = Array.from({ length: 5 }, async (_, i) => {
      const img = await loadImage(`images/${label}/${i + 1}.jpg`);
      console.log(img);
      const detections = await detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      if (detections) {
        descriptions.push(detections.descriptor);
      }
    });

    await Promise.all(loadImagePromises);
  } catch (error) {
    console.log(error);
  }

  if (descriptions.length > 0) {
    return new LabeledFaceDescriptors(label, descriptions);
  } else {
    return null;
  }
};

const writeDatabase = async () => {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    const labels = ['Pedro Gabriel', 'Luis Fernando', 'Felipe Antonio'];

    const labeledFaceDescriptors = await Promise.all(
      labels.map(async (label) => {
        return await loadFaceImages(label);
      })
    );

    const database = JSON.stringify(labeledFaceDescriptors);
    fs.writeFileSync(`Database/${filePath}`, database, (err) => console.log(err));
  }
};


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
    return new LabeledFaceDescriptors(person.label, descriptions);
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

    const faceMatcher = new FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance);
   
    const results = faceMatcher.findBestMatch(detection.descriptor);

    return results;
}

module.exports = faceDetection;