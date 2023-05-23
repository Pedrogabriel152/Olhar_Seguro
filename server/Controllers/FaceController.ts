import { Request , Response, response } from 'express';
import faceDetection from '../FaceAPI/faceDetection';

class FaceController {
    public static async compare(request:Request, response: Response) {
        const result =  await faceDetection(request.file);

        if(!result){
            return response.status(300).json({message: "Acesso negado"});
        }

        return response.status(200).json({message: `Bem vindo ${result}`});
    }
}

export default FaceController;