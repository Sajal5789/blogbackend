import Comment from "../model/comment.js";
import mongoose from "mongoose";
export const newcomment=async(request,response)=>{
try{
  console.log(request.body);
  const comment=new Comment(request.body);
  await comment.save();
  response.status(200).json({msg:"comment added successfully"});
}
catch(error){
response.status(500).json({msg:error.message});
}
}


 export const  getAllComment=async(request, response)=>{
try{
  //  console.log(request.params.id);
const comments= await Comment.find({postId:request.params.id});
response.status(200).json({comments});
}
catch(error){
response.status(500).json({msg:error.message});
}
 }

 export const deletecomment=async(request,response)=>{
  try{
  const comment=await Comment.findById(request.params.id);
 await comment.delete();
response.status(200).json({message:"delete ho gaya"});
  }
  catch(error){
    response.status(500).json({error});
  }

 }
