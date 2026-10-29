const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth.route')
const taskRoutes = require('./routes/task.route')
const applicationRoutes = require('./routes/application.route');
const dashboardRoutes = require('./routes/dashboard.route');


const app = express();

app.use(helmet());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json({limit:"1mb"}));

app.use(rateLimit({
    windowMs:15*60*1000,
    limit:100,
    standardHeaders: true,
    legacyHeaders: false,
}));

app.use(cookieParser());

app.get('/health', (req,res)=>{
    res.status(200).json({
        success:true,
        message:"Task-Bridge is running successfully"
    });
});

app.use('/api/auth', authRoutes);

app.use('/api/tasks', taskRoutes);

app.use('/api/application', applicationRoutes);

app.use('/api/dashboard', dashboardRoutes);

module.exports = app;