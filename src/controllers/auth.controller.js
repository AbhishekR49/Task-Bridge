const User = require("../models/User");
const {registerSchema} = require("../validators/auth.validator")


const register = async (req, res, next)=>{
    try{
        const result = registerSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                success:false,
                message:"Validation failed..",
                errors: result.error.issues.map((issue)=>({
                    field: issue.path.join("."),
                    message:issue.message
                }))
            });
        }

        const {name, email, password, role} = result.data;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"User is already exists"
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        return res.status(201).json({
            success:true,
            message:"User is created successfully",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    }catch(error){
        // Handle concurrent duplicate registrations
        if(error.code === 11000){

        return res.status(409).json({
        success: false,
        message: 'An account with this email already exists',
         });
        }

        next(error);
    }
}

module.exports = {register}