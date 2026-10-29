const mongoose = require("mongoose");
const Task = require("../models/Task");
const Application = require("../models/Application");
const {uploadResumeToImageKit, deleteResumeFromImagekit} = require('../services/imagekit.service');
const updateApplicationSchema = require("../validators/application.validator");

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

const getTaskApplications = async(req, res, next)=>{
  try{

    const {id: taskId} = req.params;
     // 1. Validate task ID
    if(!mongoose.isValidObjectId(taskId)){
      return res.status(400).json({
        success:false,
        message:"Invalid Task id"
      });
    }

   //find Task and select only Task id and poster_id
    const task = await Task.findById(taskId).select(" _id posterId");
    if(!task){
      return res.status(404).json({
        success:false,
        message:"Task not found"
      })
    }

  // Verify only Task owner can view it's application 
  if(task.posterId.toString() !== req.user.id){
    return res.status(403).json({
      success:false,
      message:"You are unothorized to view Applications."
    });
  }

  // Fetch the application hide sensetive information 
  const applications = await Application.find({taskId})
    .select("taskId applicantId status message createdAt ")
    .populate('applicantId', 'name')
    .sort({createdAt: -1})
    .lean();

  return res.status(200).json({
    success:true,
    count:applications.length,
    applications
  });

  }catch(error){
    next(error);
  }
} 


const updateApplicationStatus = async (req, res, next) => {
    let session;

    try {
        const { applicationId } = req.params;

        // Validate the MongoDB ObjectId before querying the database.
        if (!mongoose.isValidObjectId(applicationId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid application ID"
            });
        }

        // STEP 2: Validate the request body with Zod.
        const validation = updateApplicationSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid application status",
                errors: validation.error.issues.map(issue => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            });
        }

        // Use validated data instead of trusting req.body directly.
        const { status } = validation.data;

        //Create a MongoDB session for the transaction.
        // All related database changes must succeed or roll back together.
        session = await mongoose.startSession();

        // Store the result so we can send it after the transaction commits.
        let result;

        // This prevents partial updates if a database operation fails.
        await session.withTransaction(async () => {

            // Find the application the poster wants to process.
            const application = await Application.findById(applicationId)
                .session(session);

            if (!application) {
                const error = new Error("Application not found");
                error.statusCode = 404;
                throw error;
            }

            // Find the task AND verify that the logged-in user owns it.
            const task = await Task.findOne({
                _id: application.taskId,
                posterId: req.user.id
            }).session(session);

            // Don't allow a poster to manage another poster's application.
            if (!task) {
                const error = new Error(
                    "You are not authorized to manage this application"
                );
                error.statusCode = 403;
                throw error;
            }

            //Only pending applications can be processed.
            // This prevents reprocessing an already accepted/rejected application.
            if (application.status !== "pending") {
                const error = new Error(
                    "This application has already been processed"
                );
                error.statusCode = 409;
                throw error;
            }

            // Handle the rejection workflow.
            if (status === "rejected") {

                // A completed or closed task cannot have its applications changed.
                if (!["open", "in_progress"].includes(task.status)) {
                    const error = new Error(
                        "This task cannot be modified in its current state"
                    );
                    error.statusCode = 409;
                    throw error;
                }

                // Update only this application.
                // Other applicants remain pending so the poster can review them.
                application.status = "rejected";
                await application.save({ session });

                // Prepare the response; send it only after the transaction finishes.
                result = {
                    applicationId: application._id,
                    status: "rejected",
                    taskId: task._id,
                    taskStatus: task.status
                };

                // End this transaction callback without running acceptance logic.
                return;
            }

            // Handle the acceptance workflow.
            // A task can have only one accepted applicant in this MVP.
            if (task.status !== "open") {
                const error = new Error(
                    "This task is no longer available for acceptance"
                );
                error.statusCode = 409;
                throw error;
            }

            // Claim the task only if it still belongs to this poster
            // and its status is still "open".
            const claimedTask = await Task.findOneAndUpdate(
                {
                    _id: task._id,
                    posterId: req.user.id,
                    status: "open"
                },
                {
                    $set: { status: "in_progress" }
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            );

            // If the task could not be claimed, abort the transaction.
            if (!claimedTask) {
                const error = new Error(
                    "This task is no longer available for acceptance"
                );
                error.statusCode = 409;
                throw error;
            }

            // Mark the chosen applicant as accepted.
            application.status = "accepted";
            await application.save({ session });

            // Reject every OTHER pending application for this same task.
            // $ne means "not equal to" the selected application's ID.
            await Application.updateMany(
                {
                    taskId: task._id,
                    _id: { $ne: application._id },
                    status: "pending"
                },
                {
                    $set: { status: "rejected" }
                },
                { session }
            );

            // Prepare the response after all acceptance operations succeed.
            result = {
                applicationId: application._id,
                status: "accepted",
                taskId: task._id,
                taskStatus: "in_progress"
            };
        });

        // Send success only after the transaction completes.
        return res.status(200).json({
            success: true,
            message: status === "accepted"
                ? "Application accepted. Other pending applications were rejected."
                : "Application rejected successfully",
            application: result
        });

    } catch (error) {

        // Convert our expected business-rule errors into HTTP responses.
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        }

        // Pass unexpected database/server errors to Express error handling.
        return next(error);

    } finally {

        // Always release the session, whether the transaction succeeds or fails.
        if (session) {
            await session.endSession();
        }
    }
};



module.exports = {createApplication,
  getTaskApplications,
  updateApplicationStatus
};