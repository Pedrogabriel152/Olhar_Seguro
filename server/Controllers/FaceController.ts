import { Request , Response } from 'express';
import faceDetection from '../FaceAPI/faceDetection';

class FaceController {
    public static async compare(request:Request, response: Response) {
        const {detection} = request.body
        const result: string =  await faceDetection(detection);

        if(result === 'unknown'){
            return response.status(300).json({message: "Acesso negado"});
        }

        return response.status(200).json({message: `Bem vindo ${result}`});
    }
}

export default FaceController;