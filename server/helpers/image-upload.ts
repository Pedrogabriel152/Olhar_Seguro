import multer from 'multer';
import path from 'path';
const fs = require('fs');
import { Request } from 'express';
const folder1 = 'public';
const folderName = 'public/images';

// Destination to store the images
const imageStorage = multer.diskStorage({
    destination: (req: Request, file, cb) =>{
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folder1);
            fs.mkdirSync(folderName);
        }
        cb(null, `public/images`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));
    }
})

const imageupload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return ("Por favor, envie apenas jpg ou png");
        }
        cb(null, true);
    }
})

export default imageupload;