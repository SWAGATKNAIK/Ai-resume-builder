import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Resume from "../models/Resume.js";

const generateToken = (userId) =>{
  const token = jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: '5d' });
  return token;
}

// controller for user registation
// POST: /api/user/registation

export const registerUser = async(req, res) => {
    try {
        const { name, email, password} = req.body;

        // check if required fields arre present
        if(!name || !email || !password){
            return res.status(400).json({message: 'Missing required fields'})
        }

        // check if user alredy exists
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: 'User alredy exists'})
        }

        //create new user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name, email, password: hashedPassword
        })

        // general token
        const token = generateToken(newUser._id)
        newUser.password = undefined;

        return res.status(201).json({message: 'User created sucessfully', token, user: newUser})


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for user login
// POST: /api/user/login

export const loginUser = async(req, res) => {
    try {
        const { email, password} = req.body;

        
        // check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'})
        }

        // check if password is correct
        if(!user.comparePassword(password)){
            return res.status(400).json({message: 'Invalid email or password'})
        }

        // return succeess message
        const token = generateToken(user._id)
        user.password = undefined;

        return res.status(200).json({message: 'Login successful', token, user})


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for getting user by id 
// GET: /api/users/data

export const getUserById = async(req, res) => {
    try {
        const userid  = req.userId;

        // check if user exists
     const user = await User.findById(userid)
     if(!user){
          return res.status(404).json({message: 'User not found'})
     }

     // return user
     user.password = undefined;
     return res.status(200).json({user})


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for getting user resume
// GET: /api/user/resumes
export const getUserResumes = async (req, res) => {
    try{
      const userId = req.userId;

      // return user resumes
      const resumes = await Resume.find({ userId })
      return res.status(200).json({resumes})
    }catch (error) {
        return res.status(400).json({message: error.message})
    }
}