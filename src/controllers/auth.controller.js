const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require('node:crypto');
const {registerSchema, loginSchema} = require("../validators/auth.validator");
const Session = require("../models/Session");


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


const login = async(req, res, next) =>{
    try{
        const result = loginSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                success:false,
                message:"Validation failed..",
                errors: result.error.issues.map((issue)=>({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            })
        }

        const {email, password} = result.data;

        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password."
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password."
            });
        }

        const accessToken = jwt.sign(
            {
                sub: user._id.toString(),
                role:user.role
            },
            process.env.JWT_ACCESS_SECRET,
            {expiresIn: process.env.ACCESS_TOKEN_TTL || '15m'}
        );

        const refreshToken = crypto.randomBytes(48).toString("base64url");

        const refreshTokenHash = crypto
                        .createHash('sha256')
                        .update(refreshToken)
                        .digest('hex');

        const refreshDays = Number(process.env.REFRESH_TOKEN_DAYS || 7);
        
        if (!Number.isFinite(refreshDays) || refreshDays <= 0) {
        throw new Error('REFRESH_TOKEN_DAYS must be a positive number');
        }

        const expiresAt = new Date(
            Date.now() + refreshDays*24*60*60*1000
        );

        await Session.create({
            userId: user._id,
            refreshTokenHash,
            expiresAt
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'? 'none': 'lax',
            path: '/api/auth',
            maxAge: refreshDays * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success:true,
            message:"Login successfully.",
            accessToken,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    }catch(error){
        next(error);
    }
}

const getMe = async(req, res, next)=>{
    try{
        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User account is no longer exists"
            });
        }

        return res.status(200).json({
            success:true,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });

    }catch(error){
        next(error);
    }
}

module.exports = {register, login, getMe}