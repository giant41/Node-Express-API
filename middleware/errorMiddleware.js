const errorModdleware = (err, req, res, next) => {
    console.log('here is an error middleware')
    console.log("err", err.message)

    let statusCode = err.statusCode || res.statusCode
    let message = err.message
    if(err.message === "jwt expired") {
        statusCode = 401
        message = 'Unauthorized! Access Token was expired!'
    }

    res.status(statusCode)
    res.json({
        httpStatus:	statusCode,
        message: message, 
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}

module.exports = errorModdleware