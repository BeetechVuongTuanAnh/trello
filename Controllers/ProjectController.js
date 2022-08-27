const { isEmpty } = require('underscore');
const TypeCode = require('../Constants/typeCode');
const User = require('../Models/Users');
const Project = require('../Models/Projects');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../Configs/Jwt');

class ProjectController {


    /**
     * [GET] /user/list
     */
    list(req, res, next) {
        Project.find().populate('members').populate('project_manager')
            .then(projects => {
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
     * [GET] /project/search
     */
    search(req, res, next) {
        Project.find(req.body).populate('members').populate('project_manager')
            .then(projects => {
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
    detail(req, res, next) {
        const id = req.params._id;
        Project.findOne({ _id: id }).populate('members').populate('project_manager')
            .then(project => {
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
    update(req, res, next) {
        const id = req.body._id;
        let project = { ...req.body };
        Project.findOneAndUpdate({ _id: id }, project)
            .then((project) => {
                res.status(200);
                res.json({ message: "Cập nhật thông tin dự án thành công !" });
            })
            .catch(next);
    }


    /**
     * [DELETE] /project/delete
     */
    delete(req, res, next) {
        const id = req.params._id;
        Project.findOneAndDelete({ _id: id })
            .then((project) => {
                res.status(200);
                res.json({ message: "Xóa dự án thành công !" });
            })
            .catch(next);
    }


    /**
     * [POST] /project/create
     */
    create(req, res, next) {
        const data = req.body;
        const project_name = req.body.project_name;

        Project.find({
            'project_name': project_name,
        })
            .then(projects => {
                if (isEmpty(projects)) {
                    const project = new Project(data);

                    project.save((err) => {
                        if (err) {
                            res.status(500);
                            res.json({ message: 'Đăng kí dự án thất bại. Vui lòng thử lại !' });
                        }
                        res.status(200);
                        res.json({ message: "Đăng kí dự án thành công !" });
                    });
                } else {
                    res.status(500);
                    res.json({ message: `Dự án ${project_name} đã tồn tại. Vui lòng đăng kí dự án khác !` });
                }
            })
            .catch(next);
    }
}

module.exports = new ProjectController;