import multer from 'multer'
import path from 'path'
import { Request } from 'express'

// Destination to store the images
const imageStorage = multer.diskStorage({
    destination: (req: Request, file, cb) =>{

        const folder: string = "images"

        cb(null, `public/${folder}`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
    }
})

const imageupload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return ("Por favor, envie apenas jpg ou png");
        }

        cb(null, true)
    }
})

export default imageupload