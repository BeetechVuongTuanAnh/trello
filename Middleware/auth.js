const jwt_decode = require('jwt-decode');

class AuthMiddleware {
    /**
     * check exist token
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isLogin(req, res, next){
        const token = req.headers;
        console.log(token);
        console.log(req.headers.Authorization);
        if (token) {
            const user = jwt_decode(token);
            next();
        } else {
            res.status(401);
            res.json({ message: 'Bạn chưa đăng nhập. Vui lòng đăng nhập !' });
        }
    }
}
module.exports = new AuthMiddleware;
