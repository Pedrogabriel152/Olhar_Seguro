import express from 'express';
import * as multer from 'multer';
import cors from 'cors';
import FaceRoutes from './Routes/FaceRoutes';

const app = express();
const port: number = 5000;
app.use(cors);
app.use('/', FaceRoutes);

// let fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors()


app.listen(port, () => console.log('Tamo aqi'));