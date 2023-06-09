import { useRef, useEffect, useState, useCallback } from "react";
import * as faceapi from "face-api.js";
import { Canva, AppApplication, CameraContainer, Button2, Capturar, Response } from "../style/Style";
import Button from "../services/button";
import { useNavigate } from "react-router";
import { api } from "../api/api";
import Webcam from 'react-webcam';
import { AiOutlineCamera, AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import '@tensorflow/tfjs';

const Application = (props: any) =>{
    const [image, setImage] = useState<any>();
    const [response, setResponse] = useState<any>();
    const [statusResponse, setStatusResponse] = useState<boolean>(false);
    const navigate = useNavigate();
    const MODELS_URL = 'public/models';

    const videoRef: any = useRef(null);
    const canvasRef: any = useRef();

      const captureAndSendImage = useCallback(async () => {
        const imageSrc = videoRef.current.getScreenshot();
        setImage(imageSrc);
        console.log(imageSrc);

        // Detecte a face e envie a imagem para o backend
        await detectFaceAndSendImage(imageSrc);
        
      }, [videoRef, setImage]);
    
      const detectFaceAndSendImage = async (imageData: any) => {
        try {

          const blob = await dataURItoBlob(imageData);
          const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });

           // Verifique o tipo de arquivo
          if (file.type !== 'image/jpeg') {
            console.log('Formato de imagem não suportado. Por favor, selecione uma imagem JPEG.');
            return;
          }
      
          await sendImageToAPI(file);
        } catch (error) {
          console.error(error);
        }
      }
      
      const sendImageToAPI = async (imageData:any) => {
        try {
          console.log('[IMAGE DATA] -> ',imageData);
          console.log(imageData);
          const response = await api.post('/', {
            image: imageData
          },{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          // Trate a resposta do backend aqui
          console.log('[RESPONSE API] -> ',response.data);

          setResponse(response);
          setStatusResponse(true);
          setInterval(() => {
            setStatusResponse(false);
          }, 2000)
          console.log(response)
        } catch (error) {
          console.error(error);
        }
      };

      // Função para converter a imagem capturada em um objeto Blob
      const dataURItoBlob = async (dataURI: any) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
      
        return new Blob([ab], { type: mimeString });
      }

    const handleOnClick = () => {
      navigate('/');
    }

    return(
        <>
        <AppApplication>
        <CameraContainer>
        <Webcam
          audio={false}
          ref={videoRef}
          screenshotFormat="image/jpeg"
        />
        </CameraContainer>
        <Capturar onClick={captureAndSendImage}><AiOutlineCamera size={26}/></Capturar>
        <Canva>
        <canvas ref={canvasRef} width={940} height={650}/>
        </Canva>
        <Button2>
        <Button labelButton="Voltar" to="/" onclick={handleOnClick}/>
        </Button2>
        {response && statusResponse &&
          <Response>
            {response.status == 200
              ? <AiFillCheckCircle size={150} color="#028309"/>
              : <AiFillCloseCircle size={150} color="#ff0505"/>
            }
            <p>{response.data.message}</p>
          </Response>
        }
        </AppApplication>
        </>
    )
}

export default Application;