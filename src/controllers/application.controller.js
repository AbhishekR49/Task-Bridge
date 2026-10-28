const mongoose = require("mongoose");
const Task = require("../models/Task");
const Application = require("../models/Application");
const {uploadResumeToImageKit, deleteResumeFromImagekit} = require('../services/imagekit.service');

const createApplication = async(req, res, next)=>{
    let uploadedResume;
    try{

      const{ id: taskId} = req.params;
      const {message} = req.body;

      // 1. Validate task ID
      if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID.",
      });
    }

    // 2. Validate application message
    if (
      typeof message !== "string" ||
      message.trim().length < 20 ||
      message.trim().length > 2000
    ) {
      return res.status(400).json({
        success: false,
        message: "Message must contain 20 to 2000 characters.",
      });
    }

    // cheack Task exists
    const task = await Task.findById(taskId);

    if(!task){
        return res.status(404).json({
            success:false,
            message:"Task not found"
        });
    }

    // Only open task
    if(task.status !== 'open'){
        return res.status(400).json({
            success:false,
            message:"This Task is not accepting application"
        });
    }

    //Prevent Applying to your own Task
    if(task.posterId.toString() === req.user.id){
        return res.status(403).json({
            success:false,
            message:"You cannot apply to your own Task"
        });
    }

    // 6. Require validated resume middleware
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required. ",
      });
    }

    // 7. Upload resume to ImageKit
    uploadedResume = await uploadResumeToImageKit(req.file);

   // save application in mongoDb
   const application = await Application.create({
         taskId:task._id,
         applicantId: req.user.id,
         message: message.trim(),
         resume: {
            storageKey: uploadedResume.storageKey,
            originalName:uploadedResume.originalName
         },
   });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      application: {
        _id: application._id,
        taskId: application.taskId,
        applicantId: application.applicantId,
        message: application.message,
        status: application.status,
        createdAt: application.createdAt,
      },
    });


    }catch(error){

      if(uploadedResume){
        try{
          await deleteResumeFromImagekit(uploadedResume.storageKey)
        }catch(cleanUpError){
          console.error("failed to clean up uploaded Resume", cleanUpError.message);
        }
      }

      if(error.code === 11000){
        return res.status(409).json({
          success:false,
          message:"you already applied."
        });
      }
        next(error);
        
    }
}

module.exports = createApplication;