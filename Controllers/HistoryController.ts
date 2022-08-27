
import jwt = require('jsonwebtoken');
const jwtConfig = require('../Configs/Jwt');
const { isEmpty } = require('underscore');
const TypeCode = require('../Constants/typeCode');
const User = require('../Models/Users');
const Project = require('../Models/Projects');
const Task = require('../Models/Tasks');
const Note = require('../Models/Notes');
const History = require('../Models/Historys');
const mongoose = require('mongoose');

class HistoryController {


    /**
     * [GET] /user/list
     */
    list(req : any, res : any, next: any) {
        History.find({ task: mongoose.Types.ObjectId(req.params._id) })
            .populate('old_assign')
            .populate('old_project')
            .populate('new_assign')
            .populate('new_project')
            .populate('user_create')
            .populate('task')
            .then((histories: any) => {
                if (histories) {
                    res.status(200);
                    res.json({ histories: histories, message: "Lấy danh sách lịch sử hoạt động thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách lịch sử hoạt động thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [GET] /project/search
     */
    all(req : any, res : any, next: any) {
        History.find()
            .populate('old_assign')
            .populate('old_project')
            .populate('user_create')
            .populate('new_assign')
            .populate('new_project')
            .populate({
                path: 'task',
                populate: { path: 'project' }
            })
            .then((histories: any) => {
                if (histories) {
                    res.status(200);
                    res.json({ histories: histories, message: "Lấy danh sách lịch sử hoạt động thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách lịch sử hoạt động thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [GET] /project/search
     */
    search(req : any, res : any, next: any) {
        History.find({ user_create: mongoose.Types.ObjectId(req.params._id) })
            .populate('old_assign')
            .populate('old_project')
            .populate('user_create')
            .populate('new_assign')
            .populate('new_project')
            .populate({
                path: 'task',
                populate: { path: 'project' }
            })
            .then((histories: any) => {
                if (histories) {
                    res.status(200);
                    res.json({ histories: histories, message: "Lấy danh sách lịch sử hoạt động thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách lịch sử hoạt động thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }


    /**
     * [POST] /project/create
     */
    create(req : any, res : any, next: any) {
        const data = req.body;
        const note = new History(data);

        note.save((err: any) => {
            if (err) {
                res.status(500);
                res.json({ message: 'Cập nhật thông tin công việc thất bại. Vui lòng thử lại !' });
            }
            res.status(200);
            res.json({ message: "Cập nhật thông tin công việc thành công !" });
        });
    }
}

module.exports = new HistoryController;