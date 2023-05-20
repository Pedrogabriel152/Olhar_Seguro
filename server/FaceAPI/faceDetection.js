const faceapi = require('face-api.js');
const canvas = require('canvas');
const {loadModels} = require('./loadModels');
const { labeledFaceDescriptor  } =  require('./labeledFaceDescriptors');
const MODEL_URL = 'Models/weights';

const faceDetection = async (imageReques) => {
    await loadModels()

    console.log(imageReques)

    const image = await canvas.loadImage(`${imageReques.path}`);

    const labels = ['Pedro Gabriel', 'Luis Fernando', 'Felipe Antonio'];

    const labeledFaceDescriptors = await Promise.all(
        labels.map(async label => {
            const descriptions = []
            try {
                for(let i=1; i<=5; i++){
                    const img =  await canvas.loadImage(`images/${label}/${i}.jpg`);
                    console.log(img)
                    const detections = await faceapi
                    .detectSingleFace(img)
                    .withFaceLandmarks()
                    .withFaceDescriptor()

                    descriptions.push(detections.descriptor)
                }
                                
            }
            catch(error) {
                console.log(error);
            }

        return await new faceapi.LabeledFaceDescriptors(label, descriptions);
        })
    )

    // const labeledFaceDescriptors = await labeledFaceDescriptor();

    const maxDescriptorDistance = 0.6
    console.log(labeledFaceDescriptors)
    const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
    console.log(detections)

    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)
   
    const results = faceMatcher.findBestMatch(detections.descriptor)
    console.log("***************************************************************************")
    console.log(results)
    console.log("***************************************************************************")

    return results.label;

}

module.exports = faceDetection;