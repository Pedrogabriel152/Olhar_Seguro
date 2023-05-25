import { useRef, useEffect, useState } from "react"
import * as faceapi from "face-api.js"
import { Canva, AppApplication, CameraContainer, Button2 } from "../style/Style"
import Button from "../services/button";

const Application = (props: any) =>{

    const [modelsLoaded, setModelsLoaded] = useState<any>(false);
    const [captureVideo, setCaptureVideo] = useState(false);

    const videoHeight = 480;
    const videoWidth = 640;

    const videoRef: any = useRef()
    const canvasRef: any = useRef()

    // useEffect(()=>{
    //     startVideo()
    //     videoRef && loadmodels()
    // }, [])

    useEffect(() => {
        startVideo()
        videoRef 
      }, []);

    const startVideo = () =>{
        navigator.mediaDevices.getUserMedia({video:true})
        .then((currentStream)=>{
            videoRef.current.srcObject = currentStream
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const faceMyDetect = () => {
         setInterval(async ()=>{
            const displaySize = {
                width: videoWidth,
                height: videoHeight
              }
              
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            faceapi.matchDimensions(canvasRef.current, displaySize);
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            // const detections = await faceapi.detectAllFaces(videoRef.current,
            //     new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions
            //     canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
            //     faceapi.matchDimensions(canvasRef.current, {
            //         width: 940,
            //         height: 650
            //     })
        // const resizedDetections: any = faceapi.resizeResults(detections, {
        //     width: 940,
        //     height: 650  
        // })

        canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
        canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

        // faceapi.draw.drawDetections(canvasRef.current, resized),
        // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized),
        // faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
    }, 1000)
    }

    return(
        <>
        <AppApplication>
        {/* <h1>Teste</h1> */}
        <CameraContainer>
        <video crossOrigin="anonymous" ref={videoRef} autoPlay/>
        </CameraContainer>
        <Canva>
        <canvas ref={canvasRef} width={940} height={650}/>
        </Canva>
        <Button2>
        <Button labelButton="Voltar" to="/"/>
        </Button2>
        </AppApplication>
        </>
    )
}

export default Application