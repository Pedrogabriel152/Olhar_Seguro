import faceapi from 'face-api.js';

const MODEL_URL: string = '../Models/weights';

const faceDetection = async (fullFaceDescriptions: faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{
    detection: faceapi.FaceDetection;
}, faceapi.FaceLandmarks68>>[]) => {

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);

    const labels: Array<string> = ['Pedro', 'Luis', 'Felipe', 'Leandro'];

    const labeledFaceDescriptors = await Promise.all(
        labels.map(async label => {
            // fetch image data from urls and convert blob to HTMLImage element
            const imgUrl = `../images/${label}/${label}.png`;

            const descriptions = []
            for(let i=1; i<=3;i++) {
                try {
                    const img = await faceapi.fetchImage(`./assets/lib/face-api/labels/${label}/${i}.jpg`)
                    const detections = await faceapi
                    .detectSingleFace(img)
                    .withFaceLandmarks()
                    .withFaceDescriptor()

                    console.log(detections)

                    // if(detections != undefined){
                    //     descriptions.push(detections.descriptor)
                    // }
                }
                catch(error: any) {
                    console.log(error);
                }

                
            }

        return await new faceapi.LabeledFaceDescriptors(label, descriptions)
            // const img = await faceapi.fetchImage(imgUrl);
            
            // // detect the face with the highest score in the image and compute it's landmarks and face descriptor
            // const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            
            // if (!fullFaceDescription) {
            // throw new Error(`no faces detected for ${label}`);
            // }
            
            // const faceDescriptors = [fullFaceDescription.descriptor];
            // return new faceapi.LabeledFaceDescriptors(label, faceDescriptors);
        })
    )

    const maxDescriptorDistance: number = 0.6
    const faceMatcher: faceapi.FaceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)

    const results: Array<faceapi.FaceMatch> = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))

    let box: any;
    let text: any;

    results.forEach((bestMatch, i) => {
        box = fullFaceDescriptions[i].detection.box
        text = bestMatch.toString()
    })

    return { text, box };

}