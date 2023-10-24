const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')


const nodemailer = require('nodemailer');

// ...

router.post('/signup', (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "User already exists" });
      }

      bcrypt.hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            name,
            email,
            password: hashedPassword,
            pic
          });

          user.save()
            .then((user) => {
              // Create a transporter for sending emails (SMTP details required)
              const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'mulubrhangeberkidan@gmail.com',
                  pass: 'Mul@1511'
                }
              });
              // Email content
              const mailOptions = {
                
                to: email,
                subject: 'Welcome to Your Website',
                text: `Dear ${name},\n\nThank you for registering on our website. We're excited to have you as a member!\n\nBest regards,\nYour Website Team`
              };

              // Send the email
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

              res.json({ message: "Saved successfully" });
            })
            .catch((err) => {
              console.log(err);
            });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if (!email || !password){
        return res.status(422).json({error:"please add email and password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or Password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if (doMatch){
                //res.json({message:"sign in successful"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or Password"})
            }
        })
        .catch(err=>{
            console.log("Error", err);
        })
    })
  })
module.exports = router