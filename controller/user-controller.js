import { request, response } from "express";
import User from "../model/user.js";
import Token from "../model/token.js";
//import user from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
/*
export const signupUser=async (request,response)=>{
try{
  const hashedPassword=await bcrypt.hash(request.body.password,10);

  const User={
    name:request.body.name,
    username:request.body.username,
    password:hashedPassword
  };
 const newUser= new User(User);
 await newUser.save();
 return response.status(200).json({msg:"save ho gaya db mai "});
}
catch(error){

  return response.status(500).json({msg:"save nahi hua mongodb mai "});
}
}*/

export const signupUser = async (request, response) => {
  try {
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    console.log(request.body);
    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };

    const newUser = new User(user);
    await newUser.save();

    return response.status(200).json({ msg: "Signup successfull" });
  } catch (error) {
    return response.status(500).json({ msg: "Error while signing up user" });
  }
};

export const loginUser = async (request, response) => {
  const user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "username deoes not match" });
  }
  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
      //  { expiresIn: "15m" },
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY,
      );
      const newtoken = new Token({ token: refreshToken });
      await newtoken.save();

      return response.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      response.status(400).json({ msg: "password does not match" });
    }
  } catch (error) {
    return response.status(500).json({ msg: "error while login hte user" });
  }
};
