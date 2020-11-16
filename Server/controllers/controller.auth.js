const User = require("../models/model.user");
const { errorHandler } = require("../helpers/errHandler");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const data = { name, email, password };
  if (!name || !password || !email)
    return res.status(400).json({ error: "required all of fields" });
  try {
    const user = await User.create(data);
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) });
  }
};

exports.signin = (req,res,next)=>{
  const {email,password} = req.body;
  User.findOne({email},(err,user)=>{
    if(err || !user) return res.status(400).json({
      error: "The user with that email does not exist. Please signup!"
    })
    //status 401 means it not authencation
    if(!user.authenticate(password))
      return res.status(401).json({
        error: "The email and password do not match"
      })
    //generate token by jwt
    const token = jwt.sign({_id: user._id},process.env.JWT_SECRET)
    //send the response with cookie, key = "t", value = token and expire time
    res.cookie("t",token,{expire: new Date() + 9999});
    const {_id,name,email,role} = user;
    res.status(200).json({token,user:{_id,name,email,role}});
  })
}
exports.signout = (req,res,next)=>{
  res.clearCookie("t");
  res.status(200).json({
    message: "Signout success!"
  })
}
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth"
})

exports.isAuth = (req,res,next)=>{
  const isAuth = req.profile && req.auth && req.auth._id == req.profile._id;
  if(!isAuth) 
    return res.status(403).json({
      error: "Access denied"
    })
  next()
}

exports.isAdmin = (req,res,next)=>{
  const {role} = req.profile;
  if(role === 0)
    return res.status(403).json({
      error: "Admin resources. Access denied!"
    });
  next()
}