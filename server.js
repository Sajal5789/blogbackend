import express from "express";
import dotenv from"dotenv";
import cors from 'cors'
import bodyParser from "body-parser";
import Connection from "./database/db.js";
import router from "./routes/routes.js";

dotenv.config();
const app=express();

// Increase payload limit (e.g., 50MB)
//app.use(express.json({ limit: '50mb' }));
//app.use(express.urlencoded({ limit: '50mb', extended: true }));
const corsOption = {
    origin: [''],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));
//app.use(cors());
app.use(express.json());     
app.use(bodyParser.json({extended :true}));
app.use(bodyParser.urlencoded({extended:true})); 

if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"));
}

const PORT=process.env.PORT || 8000; 
app.use('/',router);
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
//console.log(username,password);
 const URL=process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.iqb5y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
Connection(URL);
app.listen(PORT,()=>console.log("server is runnng "));

//console.log(request.body);