const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require("../middlware/fetchUser");

const JWT_SECRET = "Sahilisagoodboy";

// Route 1: Create a User using: POST "/api/auth/createuser", No Login required

router.post("/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],async (req, res) => {
    let success = false;

    // If there are errors, return Bad request and errors 

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // Check Whether the usre with this email exists alredy 
    try {
      
      let user = await User.findOne({email: req.body.email}) 
      if(user){
        return res.status(400).json({success,error:"Sorry a user with this email already exists "})
      }

      const salt = await bcrypt.genSalt(10);

      const secPass = await bcrypt.hash(req.body.password, salt) 
      // Create a new user 
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      
      const data = {
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({success,authtoken})
    }catch (error) {
      console.log(error.message)
      res.json(500).send("internal server Error!")
    } 
  }
);


//Route 2: Authenticate a user using: POST "/api/auth/login", No Login required

router.post("/login",
[
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blank ").exists(),
  ],async (req, res) => {
    let success = false;
   // If there are errors, return Bad request and errors 
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   const {email, password} = req.body;
   try {
     let user = await User.findOne({email});
     if(!user){
      success =false;
      return res.status(400).json({error: "Please login with correct credentials "});
    }
    
    const passwordcompare = await bcrypt.compare(password, user.password);
    if(!passwordcompare){
      success = false;
      return res.status(400).json({success, error: "Please login with correct credentials "});
    }

    const data = {
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success,authtoken})
  } catch (error) {
    console.log(error.message)
    res.json(500).send("internal server Error!")
  }
  
})

//Route 3: get loggefdin user detail using: POST "/api/auth/getuser", Login required
router.post("/getuser", fetchuser ,async (req, res) => {
      try {
      const userID = req.user.id;
      const user = await User.findById(userID).select("-password") 
      res.send(user)
      } catch (error) {
        console.log(error.message)
        res.json(500).send("internal server Error!")
      }
})

module.exports = router;
