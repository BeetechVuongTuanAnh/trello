
import jwt = require('jsonwebtoken');
const jwtConfig = require('../Configs/Jwt');
const { isEmpty } = require('underscore');
const TypeCode = require('../Constants/typeCode');
const User = require('../Models/Users');
const Project = require('../Models/Projects');
const Task = require('../Models/Tasks');
const Note = require('../Models/Notes');
const Comment = require('../Models/Comments');
const mongoose = require('mongoose');

class CommentController {


    /**
     * [GET] /user/list
     */
    list(req : any, res : any, next: any) {
        Comment.find({ task: mongoose.Types.ObjectId(req.params._id) }).populate('user_create').populate('user_edit')
            .then((comments: any) => {
                if (comments) {
                    res.status(200);
                    res.json({ comments: comments, message: "Lấy danh sách bình luận thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách ghi chú thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [GET] /user/all
     */
    getAll(req : any, res : any, next: any) {
        Comment.find().populate('user_create').populate('user_edit').populate('task')
            .then((comments: any) => {
                if (comments) {
                    res.status(200);
                    res.json({ comments: comments, message: "Lấy danh sách bình luận thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách ghi chú thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [GET] /project/search
     */
    search(req : any, res : any, next: any) {
        Project.find(req.body).populate('members').populate('project_manager')
            .then((projects: any) => {
                if (projects) {
                    res.status(200);
                    res.json({ projects: projects, message: "Lấy danh sách dự án thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách dự án thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [GET] /user/detail/:_id
     */
    detail(req : any, res : any, next: any) {
        const id = req.params._id;
        Project.findOne({ _id: id }).populate('members')
            .then((project: any) => {
                if (project) {
                    res.status(200);
                    res.json({ project: project, message: "Lấy thông tin dự án thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy thông tin dự án thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [POST] /project/update
     */
    update(req : any, res : any, next: any) {
        const id = req.body._id;
        let project = { ...req.body };
        Project.findOneAndUpdate({ _id: id }, project)
            .then((project: any) => {
                res.status(200);
                res.json({ message: "Cập nhật thông tin dự án thành công !" });
            })
            .catch(next);
    }


    /**
     * [DELETE] /project/delete
     */
    delete(req : any, res : any, next: any) {
        const id = req.params._id;
        Comment.findOneAndDelete({ _id: id })
            .then((note: any) => {
                res.status(200);
                res.json({ message: "Xóa bình luận thành công !" });
            })
            .catch(next);
    }


    /**
     * [POST] /project/create
     */
    create(req : any, res : any, next: any) {
        const data = req.body;
        const comment = new Comment(data);
        if (req.files.length) {
            const files = [];
            for (var i = 0; i < req.files.length; i++) {
                files.push('/public/uploads/comments/' + req.files[i].filename)
            }
            comment.files = files;
        }

        comment.save((err: any) => {
            if (err) {
                res.status(500);
                res.json({ message: 'Đăng kí bình luận thất bại. Vui lòng thử lại !' });
            }
            res.status(200);
            res.json({ message: "Đăng kí bình luận thành công !" });
        });
    }
}

module.exports = new CommentController;