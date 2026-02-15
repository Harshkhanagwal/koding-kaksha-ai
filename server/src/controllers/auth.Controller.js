const User = require('../models/userModel')
const generateToken = require("../utils/generateToken")

const login = async (req, res) => {
    try {
        const {email, password } = req.body;

        const isUser = await User.findOne({email})

        if(!isUser) {
            return res.status(400).json({
                message : "Invalid Email, User not found"
            })
        }

        const isMatch = await isUser.comparePassword(password)

        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }

        const userRes = isUser.toObject()
        delete userRes.password

        return res.status(200).json({
            message : "Login successful",
            token : generateToken(isUser._id),
            userRes

        })
    } catch (error) {
           res.status(500).json({
          message : error.message
        })
    }
}

module.exports = {
    login
}