import express from 'express';
import FaceController from '../Controllers/FaceController';
import imageupload from '../helpers/image-upload';

const routes = express.Router();

routes.post('/', imageupload.single('image'), FaceController.compare);

export default routes;