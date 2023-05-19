const faceapi = require('face-api.js');
const canvas = require('canvas');
const {loadModels} = require('./loadModels');

const labels = ['Pedro'];

const labeledFaceDescriptor = async () => {
    await loadModels();
    await Promise.all(
        labels.map(async label => {
            const descriptions = []
            try {
                const img =  await canvas.loadImage(`images/${label}/1.jpg`);
                console.log(img)
                const detections = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor()

                descriptions.push(detections.descriptor)
                
            }
            catch(error) {
                console.log(error);
            }

        return await new faceapi.LabeledFaceDescriptors(label, descriptions);
        })
    )
}

module.exports = {labeledFaceDescriptor};