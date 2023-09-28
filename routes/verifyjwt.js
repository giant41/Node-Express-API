const jwt = require('jsonwebtoken')

const verifyToken = (authorization, res) => {
    let token = undefined
    let verified = false
    if(authorization !== undefined) {
        try{
            token = authorization.split(' ')[1]
            verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
            if(verified) {
                return true
            }
        } catch(err) {
            res.status(403).json({message: "Invalid Access Token"});
        }
    } else {
        res.status(403).json({message: "Error! Token was not provided."});
    }
}

module.exports = verifyToken