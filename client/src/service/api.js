import axios from 'axios';
import { API_NOTIFICATION_MESSAGES } from '../constants/config';
import { SERVICE_URLS } from '../constants/config';
import { getAccessToken } from '../utils/common-utils';
import { getType } from '../utils/common-utils';
//import FormData from "form-data";
const axiosInstance=axios.create({
  baseURL:'',
  
  timeout:50000,

  headers:{
    //"Content-Type": "multipart/form-data"

 "Content-Type":"application/json"
   

    
  //'Content-Type': 'multipart/form-data'
  }
})







axiosInstance.interceptors.request.use(

  function(config){
     if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
    return config;
  },
  function(error){
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(

  function(response){
    //stop global loader here
    return processResponse(response);
  }
,
function(error){
  //stop global leader here 
  return Promise.reject(processError(error));

}
)
const processResponse=(response)=>{
  if(response?.status===200){
    return{
      issuccess:true,
      data:response.data
    }
  }
    else{
      return{
      isfailure:true,
      status:response?.status,
      code:response?.code,
      msg:response?.msg,
    }
  }
  }


  const processError=(error)=>{
if(error.response){
  console.log("ERROR IN RESPONSE :", error.toJSON());
  return{
    isError:true,
    msg:API_NOTIFICATION_MESSAGES.responseFailure,
    
    code:error.response.status
  }

}
else if(error.request){
  console.log("ERROR IN REQUEST ", error.toJSON());
  return{
    isError:true,
    msg:API_NOTIFICATION_MESSAGES.requestFailure,
    code:""
  }

}
else{

  console.log("ERROR IN NETWORK", typeof error.toJSON === 'function' ? error.toJSON() : error);

//  console.log("ERROR IN NETWORK", error.toJSON());
  return{
    isError:true,
    msg:API_NOTIFICATION_MESSAGES.networkError,
    code:""
}
}
}
/*    

for(){
API[]=>()axiosInstance({})
  }

ye for loop ek hi baar chalegha jab webapp browser par load hogi .load hote hi for loop serviceurl ke andar jitni bhi aAPI hai un sabka alag alag se ek axiosinstance ka function bana degha aur ushe API{} object ke andar daal degha ab jab humne apicall(ex. API.LOGIN(DATA)) kari toh is api{}object ke ander se function chalegha (EX. LOGIN( METHOD: URL: ))  




*/ 


const API={};

for(const[key,value]of Object.entries(SERVICE_URLS)){
  API[key]=(body, showUploadProgress,showDownloadProgress)=>
    axiosInstance({
      method:value.method,
      url:value.url,
      data:value.method === 'DELETE'?{}:body,
      responseType:value.responseType,
  headers:{
    Authorization: getAccessToken(),
    "Content-Type":value.method==='POST'&& value.url==='/file/upload'?"multipart/form-data":"application/json"
  },
  TYPE: getType(value,body),


      onUploadProgress: function(progressEvent){
       // console.log(typeof showUploadProgress);
        if (showUploadProgress && progressEvent.total) {
         let percentageCompleted= Math.round((progressEvent.loaded*100)/progressEvent.total)
         // showUploadProgress(percentageCompleted);
        }
      }, 

      onDownloadProgress : function(progressEvent){
        if(showDownloadProgress && progressEvent.total){
         let percentageCompleted= Math.round((progressEvent.loaded*100)/progressEvent.total)
          showDownloadProgress(percentageCompleted);
        } 
      }, 
    });

}
export  {API};