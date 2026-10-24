const jwt = require('jsonwebtoken');

const authenticate = async(req, res, next)=>{

    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success:false,
            message:"Authentication is required."
        });
    }

    const token = authHeader.slice(7);

    try{
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET, {algorithms:['HS256']});
        if(!payload.sub || 
            !['applicant','poster'].includes(payload.role)
        ){
            return res.status(401).json({
                success:false,
                message:"Token is required.."
            });
        }

        req.user ={
                id: payload.sub,
                role: payload.role
        }
        next();

    }catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired access token',
    });
  }
}

const authorize = (...allowedRoles)=>{
    return (req, res, next)=>{

        if(!req.user){
            return res.status(401).json({
                success:false,
                message:"Authentication is required."
            });
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message:"You dont have permission to perform this task"
            });
        }

        next();
    }
}
module.exports ={authenticate, authorize}