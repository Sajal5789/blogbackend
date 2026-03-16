import {BrowserRouter,Routes,Route,Navigate,Outlet }from "react-router-dom"
import { useState } from "react";
import DataProvider from './context/DataProvider.jsx';
//import logo from './logo.svg';
import Login from './components/accounts/login.jsx';
//import './App.css';
import Home from './components/home/home.jsx'; 
import Header from "./components/header/header.jsx";
import CreatePost from "./components/create/CreatePost.jsx";
import DetailView from "./components/details/DetailView.jsx";
import Update from "./components/create/Update.jsx";
//import DetailView from "./components/details/DetailView.jsx";




const PrivateRoute=({isauthenticated,...props})=>{
return(
  isauthenticated?<>
  <Outlet/>
  
<Header/>
  </>
  :
  <Navigate replace to ='/login'/>
)
}
function App() {
  const[isauthenticated,isUserAuthenticated]=useState(false);
  return (

    <DataProvider>
  <BrowserRouter>

    <div style={{ marginTop: 64 }}>
    <Routes>
 
<Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />}/>  
 <Route  path="/" element={<PrivateRoute  isauthenticated={isauthenticated}/>}>
<Route path='/' element={<Home />}/>  
</Route>


<Route path="/create" element={<PrivateRoute    isauthenticated={isauthenticated} />}>
<Route path="/create" element={<CreatePost/>}/>
</Route>




            <Route path='/details/:id' element={<PrivateRoute isauthenticated={isauthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isauthenticated={isauthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>

            

    </Routes>
    </div>
   


  
</BrowserRouter>
</DataProvider>
 
  );
}

export default App;
