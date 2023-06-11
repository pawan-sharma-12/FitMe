import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import AtlasConnection from './Database/Connection/AtlasConnection/AtlasConnection.js';
import User from './Database/Models/User/User.js';
const port = process.env.PORT || 4000;
import authRoutes from './Routes/AuthRoutes/AuthRoutes.js'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import MLRoutes from './Routes/MLRoutes/MLRoutes.js'

let isConnectionEstablished = false;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if(!isConnectionEstablished){
   isConnectionEstablished =  AtlasConnection();
}else{
    console.log('already established the connection');
}
app.get('/',(req,res)=>{
    res.send('hello from server side');
})

app.use('/',authRoutes);
app.use('/',MLRoutes);


app.listen(port,()=>{
    console.log(`server is running at port no ${port}` );
})
