"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const jwtConfig = require('../Configs/Jwt');
const { isEmpty } = require('underscore');
const TypeCode = require('../Constants/typeCode');
const User = require('../Models/Users');
class UserController {
    /**
     * [GET] /user/list
     */
    list(req, res, next) {
        User.find({ delete_flag: TypeCode.DELETE_FLAG.FALSE })
            .then((users) => {
            if (users) {
                res.status(200);
                res.json({ users: users, message: "Lấy danh sách nhân viên thành công !" });
            }
            else {
                res.status(500);
                res.json({ message: 'Lấy danh sách nhân viên thất bại. Vui lòng thử lại !' });
            }
        })
            .catch(next);
    }
    /**
     * [GET] /user/search
     */
    search(req, res, next) {
        User.find(req.body)
            .then((users) => {
            if (users) {
                res.status(200);
                res.json({ users: users, message: "Lấy danh sách nhân viên thành công !" });
            }
            else {
                res.status(500);
                res.json({ message: 'Lấy danh sách nhân viên thất bại. Vui lòng thử lại !' });
            }
        })
            .catch(next);
    }
    /**
     * [GET] /user/detail/:_id
     */
    detail(req, res, next) {
        const id = req.params._id;
        User.findOne({ _id: id })
            .then((user) => {
            if (user) {
                res.status(200);
                res.json({ user: user, message: "Lấy thông tin nhân viên thành công !" });
            }
            else {
                res.status(500);
                res.json({ message: 'Lấy thông tin nhân viên thất bại. Vui lòng thử lại !' });
            }
        })
            .catch(next);
    }
    /**
     * [POST] /user/update
     */
    update(req, res, next) {
        const id = req.body._id;
        let user = Object.assign({}, req.body);
        if (req.files['avatar']) {
            user.avatar = '/public/uploads/users/' + req.files['avatar'][0].filename;
        }
        if (req.files['sub_avatar']) {
            user.sub_avatar = '/public/uploads/users/' + req.files['sub_avatar'][0].filename;
        }
        User.findOneAndUpdate({ _id: id }, user)
            .then((user) => {
            User.findById(id)
                .then((user) => {
                const token = jwt.sign({ user: user }, jwtConfig.SECRET_KEY, { expiresIn: jwtConfig.EXPIRES_IN });
                res.status(200);
                res.json({ token: token, message: "Cập nhật tài khoản thành công !" });
            });
        })
            .catch(next);
    }
    /**
     * [DELETE] /user/delete
     */
    delete(req, res, next) {
        const id = req.params._id;
        User.findOneAndDelete({ _id: id })
            .then((user) => {
            res.status(200);
            res.json({ message: "Xóa tài khoản nhân viên thành công !" });
        })
            .catch(next);
    }
    /**
     * [POST] /user/create
     */
    create(req, res, next) {
        const email = req.body.email;
        User.find({
            'email': email,
        })
            .then((users) => {
            if (isEmpty(users)) {
                const user = new User(req.body);
                if (req.files['avatar']) {
                    user.avatar = '/public/uploads/users/' + req.files['avatar'][0].filename;
                }
                if (req.files['sub_avatar']) {
                    user.sub_avatar = '/public/uploads/users/' + req.files['sub_avatar'][0].filename;
                }
                user.save((err) => {
                    if (err) {
                        res.status(500);
                        res.json({ message: 'Đăng kí tài khoản thất bại. Vui lòng thử lại !' });
                    }
                    res.status(200);
                    res.json({ message: "Đăng kí tài khoản thành công !" });
                });
            }
            else {
                res.status(500);
                res.json({ message: `Tài khoản ${email} đã tồn tại. Vui lòng đăng kí tài khoản khác !` });
            }
        })
            .catch(next);
    }
}
module.exports = new UserController;
