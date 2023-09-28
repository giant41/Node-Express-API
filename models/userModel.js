const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a User Name"],
            index: true, 
        },
        email: {
            type: String,
            required: [true, "Please enter a User Email"],
            index: true, 
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please enter a User Password"],
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User