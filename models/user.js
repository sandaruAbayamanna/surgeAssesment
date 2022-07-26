const mongoose=require('mongoose');
const jwt= require('jsonwebtokenn');
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

const User = mongoose.model("use",userSchema);