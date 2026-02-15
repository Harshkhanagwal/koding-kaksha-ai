
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const sayHii  = (req, res) => {
    res.status(200).json({
      message : "hello from user API"
    })
}

const allUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const createUser = async (req, res) => {
    try {
      const {name, email, password , role , isReadOnly} = req.body
      const existinguser = await User.findOne({email})
      if(existinguser) {
        return res.status(400).json({
          Message : "Can't Create User with this email, User Already exists"
        })
      }

      const hashpassword = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        name, email, password: hashpassword, role, isReadOnly
      })

      const userRes = newUser.toObject();
      delete userRes.password;
      res.status(201).json({
        success: true,
        data : userRes
      })
    }catch(err) {
        res.status(500).json({
          message : err.message
        })
    }
}



module.exports = {
    sayHii, allUsers, createUser
}