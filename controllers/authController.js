const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.JWT_SECRET_KEY
const bcrypt = require('bcrypt')

const loginUser = asyncHandler(async(req, res) => {
    try {
        let { email, password } = req.body;
        let token = ''

        const existingUser  = await User.findOne({ email: email })
        // res.status(200).json(existingUser)
        const passVerification = await bcrypt.compare(password, existingUser.password)

        if(passVerification) {
            //Creating jwt token
            token = jwt.sign(
                { userId: existingUser.id, email: existingUser.email },
                jwtSecretKey,
                { expiresIn: "1h" }
            )
            res.status(200).json({
                success: true,
                data: { 
                    userId: existingUser.id,
                    name: existingUser.name, 
                    email: existingUser.email, 
                },
                token: token,
            })
        } else {
            res.status(422).json({statusCode: 422, message: `Wrong email or password`})
        }
    } catch (err) {
        res.status(500).json({statusCode: 420, message: 'Wrong email or password'})
    }
})

const signupUser = asyncHandler(async(req, res) => {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })
        res.status(200).json(user)

    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }

    let token;
    try {
        token = jwt.sign(
        { userId: User.id, email: User.email },
        jwtSecretKey,
        { expiresIn: "1h" }
        )

        res
        .status(201)
        .json({
        success: true,
        data: { 
            userId: User.id,
            name: User.name, 
            email: User.email, 
        },
        token: token,
        })

    } catch (err) {
        const error = new Error("Error! Something went wrong.");
        throw new Error(error.message)
    }
})


module.exports = {
    loginUser,
    signupUser
}