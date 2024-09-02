const User=require("../model/User.model");
const { getDataUri } = require("../utils/dataUri");
const cloudinary = require('../utils/cloudinary');

exports.register = async(req,res)=>{
    try {
        const { name, email, password, phoneNumber } = req.body;
        console.log(name, email, password, phoneNumber);
        if ( password && password.length < 8) return res.status(401).json({ message: "password length must be at least 8 characters" });
        
        
        let user = await User.findOne({email}).select("+password");
        if(user){
            return res.status(400).json({
                message:"User already exists",
                success:false
            });
        }
        let avatar = {public_id :"sample_id", url:"https://cdn-icons-png.flaticon.com/256/17/17004.png"} // default avatar of user
        console.log(avatar);
        await User.create({name, email, password, phoneNumber, avatar});
        user = await User.findOne({email});
        const token = await user.generateToken();
        const options = {expires:new Date(Date.now()+ 90*24*60*60*1000),
            httpOnly:true,
        }

        return res.status(200).cookie("token", token, options)
        .json({
            message: `Welcome back ${user.name}`,
            success: true,
            user, token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message,
            success: false
        });
    };
}

exports.login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        // console.log(email, password);
        if(password.length<8) return res.status(401).json({message: " password length must be atleast than 8 characters"});
        
        let user = await User.findOne({email}).select("+password");
        // console.log(user.email);
        
        // console.log(user.password);
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "invalid password",
                success: false,
            });
        }
    
        const token = await user.generateToken();
        const options = {expires:new Date(Date.now()+ 90*24*60*60*1000),
            httpOnly:true,
        }

        return res.status(200).cookie("token", token, options)
        .json({
            message: `Welcome back ${user.name}`,
            success: true,
            user, token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message,
            success: false
        });
    }
}

exports.getUser = async  (req, res)=>{
    try {
        const user = await User.findOne(req.user._id);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success: false
            });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message,
            success: false
        });
        
    }
}

exports.logout = async (req, res) => {
    try {
      return res.status(200).cookie("token", { maxAge: 0 }).json({
        message: "logout success",
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  exports.update = async (req, res) => {
    try {
        const { address, city, name, email } = req.body;
        const file = req.file; // Assuming multer is handling file upload

        console.log("this is file ",file);
        let myCloud;
        if(file){
            try {
                const fileUri = getDataUri(file);
                myCloud = await cloudinary.uploader.upload(fileUri.content);
            } catch (error) {
                console.log('error uploading file to cloudinary : ', error);
                return res.status(500).json({ message: "Error uploading file to cloudinary" , success:false});  
            }
        } 

        // Find the user by ID
        let user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Update user details
        if (name) user.name = name;
        if (email) user.email = email;
        if (!address || !city) return res.status(401).json({
            message: "Data not found",
            success: false
        });
        user.address = address;
        user.city = city;
        if(myCloud){
            user.avatar={
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            }
        }
        console.log(user.avatar.url);

        // Save the updated user
        await user.save();

        // Prepare the response object
        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            city: user.city,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar, // Include updated photo if applicable
        };

        // Send the response
        return res.status(200).json({
            message: "User updated successfully",
            success: true,
            user: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
