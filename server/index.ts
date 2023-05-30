import express from 'express';
import * as multer from 'multer';
import cors from 'cors';
import FaceRoutes from './Routes/FaceRoutes';
const bodyParser = require('body-parser');

const app = express();
const port: number = 5000;
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use('/', FaceRoutes);

// let fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors()


app.listen(port, () => console.log('Tamo aqi'));