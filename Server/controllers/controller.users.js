const User = require("../models/model.user");

exports.userById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user) 
            return res.status(500).json({
                error:"User does not exist!"
            })
        req.profile = user;
        next();    
    })
}