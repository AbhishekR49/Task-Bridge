const Application = require("../models/Application");
const Task = require("../models/Task");
const mongoose = require('mongoose');

const getPosterDashboard = async (req, res, next) => {
  try {
    const posterId = new mongoose.Types.ObjectId(req.user.id);

    // Count tasks grouped by their status.
    const taskCount = await Task.aggregate([
      {
        $match: { posterId }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Initialize all status counts to zero.
    const task = {
      total: 0,
      open: 0,
      in_progress: 0,
      completed: 0,
      closed: 0
    };

    for (const item of taskCount) {
      task.total += item.count;
      task[item._id] = item.count;
    }

    // Get IDs of all tasks belonging to this poster.
    const taskIds = await Task.distinct("_id", { posterId });

    // Count applications submitted to those tasks.
    const totalApplications = await Application.countDocuments({
      taskId: { $in: taskIds }
    });

    return res.status(200).json({
      success: true,
      dashboard: {
        task,
        totalApplications
      }
    });

  } catch (error) {
    next(error);
  }
};


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