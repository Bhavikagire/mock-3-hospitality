const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.signup = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const alreadyuser = await User.findOne({email})
        if(alreadyuser){
            return res.status(400).json({message:"Email is alredy present"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newuser = new User({
            email,
            password:hashedPassword,
        })
        await newuser.save()
        res.status(201).json({message:"User registered success"})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
  
      if (!user) {
        return res.status(401).json({ message: 'wrong credentials' })
      }
  
      const passwordvalid = await bcrypt.compare(password, user.password)
      if (!passwordvalid) {
        return res.status(401).json({ message: 'not valid password' })
      }
  

      const token = jwt.sign({ userId: user._id }, 'masai', {
        expiresIn: '1h', 
      });
      res.status(200).json({
        userId: user._id,
        email: user.email,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal error' });
    }
  };