const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const verifyToken = require('../routes/verifyjwt')

const getUsers = asyncHandler(async(req, res) => {
    try{
        const verify = verifyToken(req.headers.authorization, res)
        if(verify) { 
            const users = await User.find({})
            res.status(200).json(users)
        }
    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const getUserById = asyncHandler(async(req, res) => {
    try{
        const verify = verifyToken(req.headers.authorization, res)
        if(verify) { 
            const {id} = req.params
            const user = await User.findById(id)
            user.password = undefined
            res.status(200).json(user)
        }
    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const addUser = asyncHandler(async(req, res) => {
    try{
        const verify = verifyToken(req.headers.authorization, res)
        if(verify) { 
            const user = await User.create(req.body)
            res.status(200).json(user)
        }
    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const updateUser = asyncHandler(async(req, res) => {
    try{
        const verify = verifyToken(req.headers.authorization, res)
        if(verify) { 
            const {id} = req.params
            const user = await User.findByIdAndUpdate(id, req.body)
            if(!user) {
                res.status(404)
                throw new Error(`cannot find any user with ID ${id}`)
            }
            const updateUser = await User.findById(id)
            res.status(200).json(updateUser)
        }    
    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const deleteUser = asyncHandler(async(req, res) => {
    try{
        const verify = verifyToken(req.headers.authorization, res)
        if(verify) { 
            const {id} = req.params
            const user = await User.findByIdAndDelete(id)
            if(!user) {
                res.status(404)
                throw new Error(`cannot find any user with ID ${id}`)
            } else {
                res.status(200).json({message: `User ID  ${id} deleted`})
            }
        }
    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
}