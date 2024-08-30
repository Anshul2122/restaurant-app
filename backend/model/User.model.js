
const  bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
        minlength: [10],
    },
    avatar:{
        public_id: {
            type: String,
            required: true,
        },
        url:{
            type: String,
        },
    },
    email:{
        type: String,
        required: true,
        unique: [true, "email already exists"]
    },
    
    password:{
        type: String,
        required: true,
        minlength: [8,"password must be at least 8 characters long"],
        select:false,
    },
    address:{
        type: String,
    },

    city:{
        type: String,
    },
});

userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword = async function(password){
    return match = await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id}, process.env.JWT_SECRET)
}

module.exports= mongoose.model("User", userSchema);
