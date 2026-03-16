import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


console.log("secret",process.env.ACCESS_SECRET_KEY);


export const authenticatetoken=(request,response,next)=>{
//const authHeader=request.headers['authorization'];
const authHeader = request.headers['authorization'] || request.headers['Authorization'];



const token = authHeader && authHeader.trim().split(' ')[1];
//console.log("tokeN",token);
//console.log("secret",process.env.ACCESS_SECRET_KEY);

//const token=authHeader&&authHeader.split(' ')[1];
if(token==null){
  return response.status(401).json({msg:'token is missing '});

}
//console.log("ke huaa",error);
jwt.verify(token,process.env.ACCESS_SECRET_KEY,(error,user)=>{
  if(error){
console.log("ke huaa",error);
    return response.status(403).json({msg:'invalid token',error:error.message});
  }
  request.user=user;
  next();
})


}

export default authenticatetoken;
