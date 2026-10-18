const { default: mongoose } = require("mongoose");


const applicationSchema = new mongoose.Schema({
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
        required:true,
    },
    applicantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        required:true,
        trim:true,
        minlength:20,
        maxlength:2000
    },
    resume:{
       type: new mongoose.Schema({
        storageKey:{
         type: String,
         required:true
       },
       originalName:{
          type: String,
          required:true
       } 
       }, {_id:false}),
       required:true 
    },
    status:{
        type:String,
        enum:["pending","rejected","accepted"],
        default:"pending",
        required:true
    }

},{timestamps:true});

applicationSchema.index(
   { taskId: 1,  applicantId:1},
   {unique: true}
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;