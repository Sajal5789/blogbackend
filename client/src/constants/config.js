//API_NOTIDFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES={
  loading:{
    title:'loading',
    message:'data is being loaded ,please wait'
  },
  success:{
    title:'success',
    message:'data loaded successfully'
  },
  responseFailure:{
    title:'error',
    message:'error aaya jab hum server se response fetch kar rahe the '

  },
  requestFailure:{
    title:'error',
    message:'request data ko parse karne mai error aaya hai'

  },
  networkError:{
    title:'error ',
    message:'server se connect nahi ho raha internet check karo'

  
  }
  
}

//API SERVICE CALL
//NEED SERVICE CALL {url:/, methods:get/put/post/delete, params:true/false, query:true/false,}

export const SERVICE_URLS={

 userSignup:{ url:"/signup" , method:"POST"},
userLogin:{url:'/login',method:'POST'},
uploadFile:{url:'/file/upload', method:'POST' },
createPost:{url:'/create', method:'POST'},
getAllPosts:{url:'/posts',method:'GET', params:true  },
getPostById:{url:'/post',method:'GET',query:'true'},
updatePost: { url: '/update', method: 'PUT', query: true },
deletePost: { url: '/delete', method: 'DELETE', query: true },
getAllComment:{url:'/comment',method:'GET',query:true },
newComment:{url:'/comment/new', method:'POST'},
deleteComment:{ url:'/comment/delete', method:'DELETE',query:true}
};