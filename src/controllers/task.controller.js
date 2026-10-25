const { default: mongoose } = require("mongoose");
const Task = require("../models/Task");
const {createTaskSchema, updateTaskSchema} = require("../validators/task.validator");

const createTask = async(req, res)=>{
    try{

        const result = createTaskSchema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
                success:false,
                message:"Validation failed",
                errors: result.error.issues.map((issue)=> ({
                    field: issue.path.join("."),
                    message:issue.message
                })),
            });
        }

        const task = await Task.create({
            ...result.data,
            posterId: req.user.id
        });

        return res.status(201).json({
            success:true,
            message:"Task created successfully",
            task
        });

    }catch(error){
        next(error);
    }
}

      
const getTasks = async (req, res, next) => {
  try {
    const page = req.query.page === undefined
      ? 1
      : Number(req.query.page);

    const limit = req.query.limit === undefined
      ? 5
      : Number(req.query.limit);

    if (!Number.isInteger(page) || page < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page must be a positive integer',
      });
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be an integer between 1 and 100',
      });
    }

    const allowedStatuses = [
      'open',
      'in_progress',
      'completed',
      'closed',
    ];

    const status = req.query.status;

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task status',
      });
    }

    const filter = {};

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('posterId', 'name')
        .lean(),

      Task.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      message: 'Tasks fetched successfully',
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async(req, res, next)=>{
  try{

    const {id}= req.params;

    if(!mongoose.isValidObjectId(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid Task Id."
      });
    }

    const task = await Task.findById(id)
                 .populate('posterId','name')
                 .lean()
     
    if(!task){
      return res.status(404).json({
        success:false,
        message:"Task not found"
      });
    }    
    
    return res.status(200).json({
      success:true,
      message:"Task fetched successfully..",
      task
    });

  }catch(error){
    next(error);
  }
}

const updateTask = async(req, res, next)=>{
  try{

    const{id} = req.params;
    if(!mongoose.isValidObjectId(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid Tasd id"
      });
    }

    const result = updateTaskSchema.safeParse(req.body);
    if(!result.success){
      return res.status(400).json({
        success:false,
        message:"Validation failed",
        errors: result.error.issue.map((issues)=>({
          field:issues.path.join('.'),
          message:issues.message
        }))
      });
    }

    const task = await Task.findByIdAndUpdate(
      {
        _id:id,
        posterId:req.user.id,
        status:"open"
      },
      {$set: result.data},
      {
        new:true,
        runValidators:true
      }
    );

    if(!task){
      
      const existingTask = await Task.exists({_id:id});
      if(!existingTask){
        return res.status(404).json({
          success:false,
          message:"Task does not exists"
        });
      }

      res.status(403).json({
        success:false,
        message:"Task not found, not owened by you, no longer exists"
      });
    }

    return res.status(200).json({
      success:true,
      message:"Task updated successfully",
      task
    })

  }catch(error){
    next(error);
  }
}

const closeTask = async(req, res,next)=>{
  try{

    const {id} = req.params;
     if(!mongoose.isValidObjectId(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid Tasd id"
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id:id,
        posterId:req.user.id,
        status:'open'
      },{
        $set:{status:'closed'},
      },
      {new:true, runValidators:true}
    );

    if(!task){
      const existingTask = await Task.exists({_id: id});
      
      if(!existingTask){
        return res.status(404).json({
          success:false,
          message:"Invalid Task id"
        });
      }

      return res.status(403).json({
        success:false,
        message:"Invalid Task, not owened by you, no longer exists"
      });
    }

    return res.status(200).json({
      success:true,
      message:"Task closed successfully."
    })

  }catch(error){
    next(error);
  }
}

module.exports = {createTask, getTasks, getTaskById, updateTask, closeTask};