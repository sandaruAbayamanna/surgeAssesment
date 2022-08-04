const mongoose=require('mongoose');
const jwt= require('jsonwebtokenn');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const userSchema= new mongoose.Schema({
    firstName:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    dateOfBirth:{type:Date,required:true},
    mobile:{type:Number,required:true},
    status:{type:Boolean,required:true},
    password:{type:String,required:true},
    accountType:{type:String,required:true}

});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"});
    return token
};

const User = mongoose.model("user",userSchema);

const validate = (data) =>{
    const Schema= Joi.object({
        firstName:Joi.string().required().label("First Name"),
        lastname:Joi.string().required().label("lastname"),
        email:Joi.string().required().label("email"),
        dateOfBirth:Joi.string().required().label("dateOfBirth"),
        mobile:Joi.string().required().label("mobile"),
        status:Joi.string().required().label("status"),
        password:Joi.string().required().label("password"),
        accountType:Joi.string().required().label("accountType"),

    })
    return Schema.validate(data)
    
}

module.exports={User,validate}