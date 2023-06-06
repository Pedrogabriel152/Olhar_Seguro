import express from 'express';
import cors from 'cors';
import FaceRoutes from './Routes/FaceRoutes';

const app = express();
const port: number = 5000;
app.use(express.json({ limit: '5mb' }))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use('/', FaceRoutes);

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
