
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


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, isReadOnly } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "Email already in use"
        });
      }
    }

    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = hashedPassword;
    user.role = role || user.role;
    user.isReadOnly = isReadOnly !== undefined ? isReadOnly : user.isReadOnly;

    await user.save();

    const userRes = user.toObject();
    delete userRes.password;

    res.status(200).json({
      success: true,
      data: userRes
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {
    sayHii, allUsers, createUser, deleteUser, updateUser
}