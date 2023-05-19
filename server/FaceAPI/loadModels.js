const faceapi = require('face-api.js');
const canvas = require('canvas');
const MODEL_URL = 'Models/weights';

const loadModels = async () => {
    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
}

module.exports = {
    loadModels
}