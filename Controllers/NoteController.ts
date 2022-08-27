
import jwt = require('jsonwebtoken');
const jwtConfig = require('../Configs/Jwt');
const { isEmpty } = require('underscore');
const TypeCode = require('../Constants/typeCode');
const User = require('../Models/Users');
const Project = require('../Models/Projects');
const Task = require('../Models/Tasks');
const Note = require('../Models/Notes');
const mongoose = require('mongoose');

class NoteController {


    /**
     * [GET] /user/list
     */
    list(req : any, res : any, next: any) {
        Note.find({ owner: mongoose.Types.ObjectId(req.params._id) })
            .then((notes: any) => {
                if (notes) {
                    res.status(200);
                    res.json({ notes: notes, message: "Lấy danh sách ghi chú thành công !" });
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
        Note.findOneAndDelete({ _id: id })
            .then((note: any) => {
                res.status(200);
                res.json({ message: "Xóa ghi chú thành công !" });
            })
            .catch(next);
    }


    /**
     * [POST] /project/create
     */
    create(req : any, res : any, next: any) {
        const data = req.body;
        const note = new Note(data);

        note.save((err: any) => {
            if (err) {
                res.status(500);
                res.json({ message: 'Đăng kí ghi chú thất bại. Vui lòng thử lại !' });
            }
            res.status(200);
            res.json({ message: "Đăng kí ghi chú thành công !" });
        });
    }
}

module.exports = new NoteController;