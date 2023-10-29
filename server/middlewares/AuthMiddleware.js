const jwt = require("jsonwebtoken");
const AuthMiddleware = (req, res, next) => {
    const pathPass = ['/users/login', '/users/register', '/article', `/article/detail`, '/users/detail']

    let arrUrl = req.originalUrl.split('/')
    if(arrUrl.length > 3){
        arrUrl.pop()
        arrUrl = arrUrl.join('/')
    } else {
        arrUrl = req.originalUrl
    }
    if(!pathPass.includes(arrUrl)){
        if (req.headers.authorization){
            if(jwt.verify(req.headers.authorization, process.env.SECRET_KEY)){
                next()
            } else {
                res.status(401).json({message: "Token Invalid"})
            }
        } else {
            next()
            // res.status(401).json({message: "Add authorization "})
        }
    } else {
        next()
    }
}

module.exports = AuthMiddleware