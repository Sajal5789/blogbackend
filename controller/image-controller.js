import mongoose from 'mongoose';
import grid from 'gridfs-stream';

//import { Connection,mongo } from 'mongoose';
//import { request, response } from "express";

let gfs,gridfsBucket;
const conn=mongoose.connection;
conn.once('open',()=>{
    gridfsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    });
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection("fs");
})


 


const url = '';

export const uploadImage = (request, response) => {
    //console.log(response);
    if(!request.file) 
        return response.status(404).json("File not found");
    else{
    const imageUrl = `${url}/file/${request.file.filename}`;

    return response.status(200).json(imageUrl);
    }    
}





export const getImage = async (request, response) => {
    try {   
          console.log('erer');
        const file = await gfs.files.findOne({ filename: request.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(response);





        if (!file) {
            return response.status(404).json({ msg: "File not found" });
        }

        response.set('Content-Type', file.contentType); 




        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        console.log('erer',error);
       return response.status(500).json({ msg: error.message });
    }
}