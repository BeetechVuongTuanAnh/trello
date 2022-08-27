"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    list(req, res, next) {
        History.find({ task: mongoose.Types.ObjectId(req.params._id) })
            .populate('old_assign')
            .populate('old_project')
            .populate('new_assign')
            .populate('new_project')
            .populate('user_create')
            .populate('task')
            .then((histories) => {
            if (histories) {
                res.status(200);
                res.json({ histories: histories, message: "Lấy danh sách lịch sử hoạt động thành công !" });
            }
            else {
                res.status(500);
                res.json({ message: 'Lấy danh sách lịch sử hoạt động thất bại. Vui lòng thử lại !' });
            }
        })
            .catch(next);
    }
    /**
     * [GET] /project/search
     */
    all(req, res, next) {
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
            .then((histories) => {
            if (histories) {
                res.status(200);
                res.json({ histories: histories, message: "Lấy danh sách lịch sử hoạt động thành công !" });
            }
            else {
                res.status(500);
                res.json({ message: 'Lấy danh sách lịch sử hoạt động thất bại. Vui lòng thử lại !' });
            }
        })
            .catch(next);
    }
    /**
     * [GET] /project/search
     */
    search(req, res, next) {
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
            .then((histories) => {
            if (histories) {
                res.status(200);
                res.json({ histories: histories, message: "Lấy danh sách lịch sử hoạt động thành công !" });
            }
            else {
                res.status(500);
                res.json({ message: 'Lấy danh sách lịch sử hoạt động thất bại. Vui lòng thử lại !' });
            }
        })
            .catch(next);
    }
    /**
     * [POST] /project/create
     */
    create(req, res, next) {
        const data = req.body;
        const note = new History(data);
        note.save((err) => {
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
