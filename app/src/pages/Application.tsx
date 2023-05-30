import { useRef, useEffect, useState, useLayoutEffect, useCallback } from "react"
import * as faceapi from "face-api.js"
import { Canva, AppApplication, CameraContainer, Button2 } from "../style/Style"
import Button from "../services/button";
import { useNavigate } from "react-router";
import { api } from "../api/api";
import Webcam from 'react-webcam';
import canvas from 'canvas';
import '@tensorflow/tfjs';

const Application = (props: any) =>{
    const [image, setImage] = useState<any>();
    const [modelsLoaded, setModelsLoaded] = useState<any>(false);
    const [captureVideo, setCaptureVideo] = useState(false);
    const [videoplay, setVide0Play] = useState<boolean>(true);
    const navigate = useNavigate();
    const canvas = document.createElement('canvas');

    const videoHeight = 480;
    const videoWidth = 640;

    const videoRef: any = useRef(null)
    const canvasRef: any = useRef()
    const webcamRef: any = useRef(null);

    // useEffect(()=>{
    //     startVideo()
    //     videoRef && loadmodels()
    // }, [])

    useEffect(() => {
      const loadModels = async () => {
        await faceapi.nets.tinyFaceDetector.loadFromUri("models")
        await faceapi.nets.ssdMobilenetv1.loadFromUri("models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("models")
        await faceapi.nets.faceRecognitionNet.loadFromUri("models")
        await faceapi.nets.faceExpressionNet.loadFromUri("models")
  
        // Inicie a detecção de rosto após o carregamento dos modelos
        // startFaceDetection();
      };

      loadModels();
        
      }, []);

      // const startFaceDetection = async () => {
      //   // Aguarde a inicialização da webcam
      //   const videoElement = await new Promise((resolve) => {
      //     const videoElement = videoRef.current.video
      //     videoElement.id = 'video'
      //     videoElement.onloadeddata = resolve;
      //     return videoElement;
      //   });
    
      //   // Defina um intervalo para realizar a detecção contínua da face
      //   setInterval(() => {
      //     captureAndSendImage(videoElement);
      //   }, 1000); // Intervalo de 1 segundo
      // };

      // const captureAndSendImage = async () => {
      //   const imageSrc = videoRef.current.getScreenshot();
    
      //   // Detecte a face e envie a imagem para o backend
      //   await detectFaceAndSendImage(imageSrc);
      // };

      const captureAndSendImage = useCallback(async () => {
        const imageSrc = videoRef.current.getScreenshot();
        setImage(imageSrc);
        console.log(imageSrc)

        // Detecte a face e envie a imagem para o backend
        await detectFaceAndSendImage(imageSrc);
      }, [videoRef, setImage]);

      const loadImage = async (image: any) => {
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        if(ctx) {
          ctx!.drawImage(image, 0, 0);
          return ctx;
        }
      }

      const transformToTNetInput = async (imageData: any) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
      
          image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
      
            const ctx = canvas.getContext('2d');
            ctx!.drawImage(image, 0, 0);
      
            const netInput = faceapi.toNetInput(canvas);
      
            resolve(netInput);
          };
      
          image.onerror = (error) => {
            reject(error);
          };
      
          image.src = imageData;

          return image
        });

        return image
      };
    
      const detectFaceAndSendImage = async (imageData: any) => {
        try {
          // Load Image
          const imageCanvas = await transformToTNetInput(imageData);

          // console.log('[IMAGE CANVA] -> ', imageCanvas)
          // Detecte a face na imagem
          const faceDetection = await faceapi.detectSingleFace(imageCanvas)
            .withFaceLandmarks()
            .withFaceDescriptor();
          
            console.log('[FACE DETECTION] -> ', faceDetection)
          // if (faceDetection) {
          //   const faceImage = await faceapi.extractFaces(imageData, [faceDetection.]);
    
          //   // Envie a imagem para o backend aqui
          //   await sendImageToAPI(faceImage[0].toDataURL());
          // }
          await sendImageToAPI(faceDetection)
        } catch (error) {
          console.error(error);
        }
      }
      
      const sendImageToAPI = async (imageData:any) => {
        try {
          if(imageData.length == 0){
            return;
          }

          console.log('[IMAGE DATA] -> ',imageData)
          const response = await api.post('/', {
            image: imageData
          });
    
          // Trate a resposta do backend aqui
          console.log('[RESPONSE API] -> ',response.data);
        } catch (error) {
          console.error(error);
        }
      };
      // useLayoutEffect(() => {
      //   setInterval(() => videoRef && loadmodels(), 1000);
      //   // const loadModels = async () => {
      //   //   const MODEL_URL ='models';
      //   //   console.log(MODEL_URL);
    
      //   //   // Promise.all([
      //   //   //   faceapi.nets.tinyFaceDetector.loadFromUri('public/models'),
      //   //   //   faceapi.nets.faceLandmark68Net.loadFromUri('public/models'),
      //   //   //   faceapi.nets.faceRecognitionNet.loadFromUri('public/models'),
      //   //   //   faceapi.nets.faceExpressionNet.loadFromUri('public/models'),
      //   //   // ]).then((res)=>{
      //   //   //   console.log(res)
      //   //   //   // setModelsLoaded(true)
      //   //   // })
      //   //   // .catch(error => console.log(error));
      //   // }
      //   // loadModels();
      // },[])

    // const startVideo = () =>{
    //     navigator.mediaDevices.getUserMedia({video:true})
    //     .then((currentStream)=>{
    //         videoRef.current.srcObject = currentStream
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // }

    // const loadmodels = () =>{

    //     Promise.all([
    //         faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    //         faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    //         faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    //         faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    //     ]).then(()=>{
    //         faceMyDetect()
    //     })
    // }

    // const faceMyDetect = () => {
    //      setInterval(async ()=>{
    //         const displaySize = {
    //             width: videoWidth,
    //             height: videoHeight
    //           }
    //           console.log('chamou')
              
    //         const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptors();
    //         // console.log(detections)
    //         submit(detections)
    //         faceapi.matchDimensions(canvasRef.current, displaySize);
    //         const resizedDetections = faceapi.resizeResults(detections, displaySize);
    //         // const detections = await faceapi.detectAllFaces(videoRef.current,
    //         //     new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions
    //         //     canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
    //         //     faceapi.matchDimensions(canvasRef.current, {
    //         //         width: 940,
    //         //         height: 650
    //         //     })
    //     // const resizedDetections: any = faceapi.resizeResults(detections, {
    //     //     width: 940,
    //     //     height: 650  
    //     // })

    //     canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
    //     canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
    //     canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
    //     canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

    //     // faceapi.draw.drawDetections(canvasRef.current, resized),
    //     // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized),
    //     // faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
    // }, 10000)
    // }

  //   const submit = (detections: faceapi.WithFaceDescriptor<faceapi.WithFaceExpressions<faceapi.WithFaceLandmarks<{
  //     detection: faceapi.FaceDetection;
  // }, faceapi.FaceLandmarks68>>>[]) => {
  //   console.log(detections)
  //     if(detections.length == 0){
  //       return;
  //     }
  //     // console.log(detections)
  //     setTimeout(() => {
  //       api.post('/', detections).then(res => console.log(res)).catch(error => console.log(error))
        
  //     }, 2400000)
  //   }

    const handleOnClick = () => {
      alert('Clicou')
      setVide0Play(false);
      navigate('/')
    }

    return(
        <>
        <AppApplication>
        {/* <h1>Teste</h1> */}
        <CameraContainer>
        {/* {videoplay && <video id="video"/>} */}
        <Webcam
          audio={false}
          ref={videoRef}
          screenshotFormat="image/jpeg"
        />
        </CameraContainer>
        <button onClick={captureAndSendImage} style={{ background: 'red'}}>Capturar</button>
        <Canva>
        <canvas ref={canvasRef} width={940} height={650}/>
        
        
        </Canva>
        <Button2>
        <Button labelButton="Voltar" to="/" onclick={handleOnClick}/>
        </Button2>
        </AppApplication>
        </>
    )
}

export default Application