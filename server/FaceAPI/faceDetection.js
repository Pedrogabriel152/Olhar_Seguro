const faceapi = require('face-api.js');
const canvas = require('canvas');
const MODEL_URL = 'Models/weights';

const faceDetection = async (imageReques) => {

    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
    console.log(imageReques)

    const image = await canvas.loadImage(`${imageReques.path}`);
    console.log(image)
    const labels = ['Pedro'];

    const fullFaceDescriptions = await faceapi
        .detectAllFaces(image)
        .withFaceLandmarks()
        .withFaceDescriptors();


    const labeledFaceDescriptors = await Promise.all(
        labels.map(async label => {
            // // fetch image data from urls and convert blob to HTMLImage element
            // const imgUrl = `../images/${label}/${label}.png`;

            const descriptions = []
            try {
                const img =  await canvas.loadImage(`images/${label}/1.jpg`);
                console.log(img)
                const detections = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor()

                // console.log(detections)
                descriptions.push(detections.descriptor)
                
            }
            catch(error) {
                console.log(error);
            }

        return await new faceapi.LabeledFaceDescriptors(label, descriptions)
            
            // // detect the face with the highest score in the image and compute it's landmarks and face descriptor
            // const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            // // console.log(fullFaceDescription)
            
            // if (!fullFaceDescription) {
            //     return "";
            // }
            // // console.log(fullFaceDescription)
            
            // const faceDescriptors = [fullFaceDescription.descriptor];
            // // console.log(faceDescriptors);
            // return new faceapi.LabeledFaceDescriptors(label, faceDescriptors);
            // console.log(labessd)
            // return descriptions;
        })
    )

    const maxDescriptorDistance = 0.6
    console.log(labeledFaceDescriptors)
    const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();

    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)
    // console.log(faceMatcher)

    // console.log(detections)

    // const results = fullFaceDescriptions.map(fd => {
    //     console.log(fd.descriptor)
    //     return faceMatcher.findBestMatch(fd.descriptor)
    // })// image.map(fd => faceMatcher.findBestMatch(fd.descriptor))
    const results = faceMatcher.findBestMatch(detections.descriptor)
        console.log("***************************************************************************")
    console.log(results)
    console.log("***************************************************************************")


    // let box;
    // let text;

    // results.forEach((bestMatch, i) => {
    //     box = image[i].detection.box
    //     text = bestMatch.toString()
    // })

    // return { text, box };

    // return results.label;

}

module.exports = faceDetection;