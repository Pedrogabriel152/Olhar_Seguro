import express from 'express';
import FaceController from '../Controllers/FaceController';

const routes = express.Router();

routes.post('/', FaceController.compare);

export default routes;