const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


const app = express();

app.use(helmet());
app.use(cors({
    origin:"http://localhost:5173"
}));

app.use(express.json({limit:"1mb"}));

app.use(rateLimit({
    windowMs:15*60*1000,
    limit:100,
    standardHeaders: true,
    legacyHeaders: false,
}));

app.use('/health', (req,res)=>{
    res.status(200).json({
        success:true,
        message:"Task-Bridge is running successfully"
    });
})

module.exports = app;