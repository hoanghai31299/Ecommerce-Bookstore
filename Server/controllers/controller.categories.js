const Category = require("../models/model.category");
const {errorHandler} = require("../helpers/errHandler");
exports.create = (req,res)=>{
    const {name} = req.body;
    if(!name) return res.json({error: "Can't not create this category"});
    const newCate = new Category({name});
    newCate.save((err,category)=>{
        if(err)
            return res.status(500).json({
                error: errorHandler(err)
            })
        return res.status(200).json({
            message: "Create category successful",
            category
        })
    })
}