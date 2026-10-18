const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
    posterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:150
    },
     description:{
        type:String,
        required:true,
        trim: true,
        minlength:20,
        maxlength:5000
    },
    paymentAmount:{
        type:Number,
        required:true,
        min:0.01
    },
    currency:{
        type:String,
        required:true,
        default:"INR",
        enum:["INR"]
    },
    status:{
        type:String,
        enum:["open", "in_progress", "completed", "closed"],
        default:"open",
        required:true,
    },
},{
    timestamps:true
});

taskSchema.index({posterId: 1, createdAt: -1});
taskSchema.index({status: 1, createdAt: -1});


const Task = mongoose.model("Task", taskSchema);

module.exports = Task;