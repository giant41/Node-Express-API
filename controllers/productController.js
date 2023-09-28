const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const verifyToken = require('../routes/verifyjwt')

const getProducts = asyncHandler(async(req, res) => {
    try{
        const verify = verifyToken(req.headers.authorization, res)
        if(verify) {
            const products = await Product.find({})
            res.status(200).json(products)
        }
    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const getProductById = asyncHandler(async(req, res) => {
    try{
        const verify = verifyToken(req.headers.authorization, res)
        if(verify) {
            const {id} = req.params
            const product = await Product.findById(id)
            if(!product) {
                res.status(404).json({statusCode: 404, message: `Cannot find any product with ID ${id}`})
            } else {
                res.status(200).json(product)
            }
        }
    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const addProduct = asyncHandler(async(req, res) => {
    try{
        const verify = verifyToken(req.headers.authorization, res)
        if(verify) { 
            const product = await Product.create(req.body)
            res.status(200).json(product)
        }
    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const updateProduct = asyncHandler(async(req, res) => {
    try{
        const verify = verifyToken(req.headers.authorization, res)
        if(verify) { 
            const {id} = req.params
            const product = await Product.findByIdAndUpdate(id, req.body)
            if(!product) {
                res.status(404).json({statusCode: 404, message: `Cannot find any product with ID ${id}`})
            }
            const updateProduct = await Product.findById(id)
            res.status(200).json(updateProduct)
        }
    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const deleteProduct = asyncHandler(async(req, res) => {
    try{
        const verify = verifyToken(req.headers.authorization, res)
        if(verify) { 
            const {id} = req.params
            const product = await Product.findByIdAndDelete(id)
            if(!product) {
                res.status(404).json({statusCode: 404, message: `Cannot find any product with ID ${id}`})
            } else {
                res.status(200).json({statusCode: 200, message: `Product ID  ${id} deleted`})
            }
        }
    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
}