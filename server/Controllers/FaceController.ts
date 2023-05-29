import { Request , Response, response } from 'express';
import faceDetection from '../FaceAPI/faceDetection';

class FaceController {
    public static async compare(request:Request, response: Response) {
        // console.log(request)
        console.log("uidagsdiajsbdhiasdy")

        const result =  await faceDetection(request.file);

        // if(!result){
        //     return response.status(300).json({message: "Acesso negado"});
        // }

        return response.status(200).json({message: `Bem vido ${result}`});
        
    }
}

export default FaceController;