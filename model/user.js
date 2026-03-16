import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
{
  timestamps:true
});


const user = mongoose.model('user', userSchema);

export default user;














/*
import mongoose from 'mongoose';

const userSchema =mongoose.Schema({
name:{
  type:string,
  requiured:true
},
username:{
  type:string,
  required:true,
  unique:true
},
password:{
  type:string,
  required:true
}


},
{
timestamps:true
});
  const user=mongoose.model('user',userSchema);
 export default user;
 */