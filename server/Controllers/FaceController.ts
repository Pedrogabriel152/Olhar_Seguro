import { Request , Response } from 'express';
import faceDetection from '../FaceAPI/faceDetection';

class FaceController {
    public static async compare(request:Request) {
        // console.log(request)

        await faceDetection(request.file);
        
    }
}

export default FaceController;