const Application = require("../models/Application");
const Task = require("../models/Task");
const mongoose = require('mongoose');

const getPosterDashboard = async(req, res, next)=>{
    try{

        const posterId = req.user.id;

        const taskCount = await Task.aggregate([
            // Include only Task created by this Poster
            {
                $match:{ posterId:new mongoose.Types.ObjectId(posterId)}
            },{
                $group:{               //count how many task belonging to each status
                    _id:"$status",
                    count:{$sum: 1}
                }
            }
        ]);

     // Convert the aggregation results into easy-to-use dashboard numbers.
     const task = {
        total:0,
        open:0,
        in_progress :0,
        completed:0,
        closed:0
     }

     for (const item of taskCount) {
            task.total += item.count;

            if (item._id === "open") task.open = item.count;
            if (item._id === "in_progress") task.in_progress = item.count;
            if (item._id === "completed") task.completed = item.count;
            if (item._id === "closed") task.closed = item.count;
        }

    // Count all applications submitted to this poster's tasks.
        const totalApplications = await Application.countDocuments({
            taskId: {
                $in: await Task.find({ posterId }).distinct("_id")
            }
        });

        // Send the dashboard statistics to the frontend.
        return res.status(200).json({
            success: true,
            dashboard: {
                task,
                totalApplications
            }
        });


    }catch(error){
       next(error);
    }
}

const getApplicantDashboard = async(req, res, next)=>{
    try{

       const applicantId  = req.user.id;

       const applicationCount = await Application.aggregate([
        {
            $match:{ applicantId: new mongoose.Types.ObjectId(applicantId)}
        },{
            // Group applications by status and count each group.
            $group:{_id:"$status", 
                count:{$sum: 1}
            }
        }
       ]);

       const application={
        total:0,
        pending:0,
        accepted:0,
        rejected:0
       }

        // Convert the aggregation results into dashboard statistics.
       for(const item of applicationCount){
        application.total += item.count;
        
        application[item._id] = item.count;
       }

       return res.status(200).json({
        success:true,
        dashboard:{ 
            application
        }    
       });

    }catch(error){
        next(error);
    }
}


module.exports = {getPosterDashboard, 
       getApplicantDashboard
};