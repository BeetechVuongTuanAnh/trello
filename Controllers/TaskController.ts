import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');
const jwtConfig = require('../Configs/Jwt');
const { isEmpty } = require('underscore');
const TypeCode = require('../Constants/typeCode');
const User = require('../Models/Users');
const Project = require('../Models/Projects');
const Task = require('../Models/Tasks');

const mongoose = require('mongoose');

class TaskController {


    /**
     * [GET] /user/list
     */
    list(req: Request, res: Response, next: NextFunction) {
        Task.find({ project: mongoose.Types.ObjectId(req.params._id) })
            .then((tasks: any) => {
                if (tasks) {
                    res.status(200);
                    res.json({ tasks: tasks, message: "Lấy danh sách công việc thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách công việc thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [GET] /user/list
     */
    all(req: Request, res: Response, next: NextFunction) {
        Task.find().populate('project').populate('assign')
            .then((tasks: any) => {
                if (tasks) {
                    res.status(200);
                    res.json({ tasks: tasks, message: "Lấy danh sách công việc thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách công việc thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [GET] /project/search
     */
    search(req: Request, res: Response, next: NextFunction) {
        for (const [key, value] of Object.entries(req.body)) {
            if (key === "project") {
                req.body.project = mongoose.Types.ObjectId(req.body.project);
            }
            if (key === "assign") {
                req.body.assign = mongoose.Types.ObjectId(req.body.assign);
            }
        }
        Task.find(req.body).populate('project').populate('assign')
            .then((tasks: any) => {
                if (tasks) {
                    res.status(200);
                    res.json({ tasks: tasks, message: "Lấy danh sách công việc thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách công việc thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [GET] /user/detail/:_id
     */
    detail(req: Request, res: Response, next: NextFunction) {
        const id = req.params._id;
        Task.findOne({ _id: id }).populate({
            path: 'project',
            populate: { path: 'project_manager' }
        }).populate('assign').populate('user_create').populate('parent_task')
            .then((task: any) => {
                if (task) {
                    res.status(200);
                    res.json({ data: { task: task }, message: "Lấy thông tin công việc thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy thông tin công việc thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [POST] /project/update
     */
    update(req: Request, res: Response, next: NextFunction) {
        const id = req.body._id;
        let task = { ...req.body };
        if ((req as any).files.length) {
            const files = [];
            for (var i = 0; i < (req as any).files.length; i++) {
                files.push('/public/uploads/tasks/' + (req as any).files[i].filename)
            }
            task.files = files;
        }
        Task.findOneAndUpdate({ _id: id }, task)
            .then((task: any) => {
                res.status(200);
                res.json({ message: "Cập nhật thông tin công việc thành công !" });
            })
            .catch(next);
    }


    /**
     * [DELETE] /project/delete
     */
    delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params._id;
        Project.findOneAndDelete({ _id: id })
            .then((project: any) => {
                res.status(200);
                res.json({ message: "Xóa dự án thành công !" });
            })
            .catch(next);
    }


    /**
     * [POST] /project/create
     */
    create(req: Request, res: Response, next: NextFunction) {
        const data = req.body;
        const title = req.body.title;

        Task.find({
            'title': title,
        })
            .then((tasks: any) => {
                if (isEmpty(tasks)) {
                    const task = new Task(data);
                    if ((req as any).files.length) {
                        const files = [];
                        for (var i = 0; i < (req as any).files.length; i++) {
                            files.push('/public/uploads/tasks/' + (req as any).files[i].filename)
                        }
                        task.files = files;
                    }

                    task.save((err: any) => {
                        if (err) {
                            res.status(500);
                            res.json({ message: 'Đăng kí công việc thất bại. Vui lòng thử lại !' });
                        }
                        res.status(200);
                        res.json({ message: "Đăng kí công việc thành công !" });
                    });
                } else {
                    res.status(500);
                    res.json({ message: `Công việc ${title} đã tồn tại. Vui lòng đăng kí công việc khác !` });
                }
            })
            .catch(next);
    }
}

module.exports = new TaskController;