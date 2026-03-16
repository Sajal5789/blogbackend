import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { request, response } from "express";
const storage = new GridFsStorage({
    url: `mongodb+srv://sajalthakur0212:sajal11@cluster0.iqb5y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 