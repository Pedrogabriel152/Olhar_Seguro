import { Request , Response, response } from 'express';
import faceDetection from '../FaceAPI/faceDetection';

class FaceController {
    public static async compare(request:Request, response: Response) {
        
        const image = request.body

        console.log(image)

        const result =  await faceDetection(image);

        // if(!result){
        //     return response.status(300).json({message: "Acesso negado"});
        // }

        return response.status(200).json({message: `Bem vido ${result}`});

        // return response.json('Olá')
        
    }
}

export default FaceController;