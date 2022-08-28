import { NextFunction, Request, Response } from 'express';
const { isEmpty } = require('underscore');
const User = require('../Models/Users');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../Configs/Jwt');
const bcrypt = require("bcrypt");

class AuthController {
    /**
     * [POST] /login
     */
    login(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        User.findOne({
            'email': email,
        }).then((user:any) => {
            if (isEmpty(user)) {
                res.status(401);
                res.send('Thông tin tài khoản hoặc mật khẩu không chính xác');
            } else {
                const validPassword = bcrypt.compareSync(password, user.password);
                if (validPassword) {
                    const token = jwt.sign({ user: user }, jwtConfig.SECRET_KEY, { expiresIn: jwtConfig.EXPIRES_IN });
                    res.status(200);
                    res.json({ 'token': token });
                } else {
                    res.status(401);
                    res.send('Thông tin tài khoản hoặc mật khẩu không chính xác');
                }
            }
        }).catch(next);
    }

    /**
     * [POST] /user/update
     */
    change(req: Request, res: Response, next: NextFunction) {
        const id = req.body._id;
        const old_password = req.body.old_password;
        const password = req.body.password;
        const salt = bcrypt.genSaltSync(10);

        User.findById(id)
            .then((user:any) => {
                if (user) {
                    const validPassword = bcrypt.compareSync(old_password, user.password);
                    if (validPassword) {
                        user.password = bcrypt.hashSync(password, salt);
                        user.save((err:any) => {
                            if (err) {
                                res.status(500);
                                res.json({ message: 'Đổi mật khẩu thất bại. Vui lòng thử lại !' });
                            }
                            res.status(200);
                            res.json({ message: "Đổi mật khẩu thành công !" });
                        });
                    } else {
                        res.status(500);
                        res.json({ message: 'Đổi mật khẩu thất bại. Vui lòng thử lại !' });
                    }
                } else {
                    res.status(500);
                    res.json({ message: 'Đổi mật khẩu thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }


    /**
     * [POST] /user/update
     */
    reset(req: Request, res: Response, next: NextFunction) {
        const id = req.params._id;
        const salt = bcrypt.genSaltSync(10);

        User.findById(id)
            .then((user:any) => {
                if (user) {
                    user.password = bcrypt.hashSync("example@Ex123", salt);
                    user.save((err:any) => {
                        if (err) {
                            res.status(500);
                            res.json({ message: 'Thiết lập lại mật khẩu thất bại. Vui lòng thử lại !' });
                        }
                        res.status(200);
                        res.json({ message: "Thiết lập lại mật khẩu thành công !" });
                    });
                } else {
                    res.status(500);
                    res.json({ message: 'Thiết lập lại mật khẩu thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }
}

module.exports = new AuthController;