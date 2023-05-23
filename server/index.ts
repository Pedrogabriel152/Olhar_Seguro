import express from 'express';
import FaceRoutes from './Routes/FaceRoutes';

const app = express();
const port: number = 5000;

app.use('/', FaceRoutes);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));