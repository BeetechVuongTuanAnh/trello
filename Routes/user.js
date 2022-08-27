const express = require('express');
const multer = require('multer');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const userController = require('../Controllers/UserController');

const DIR = './public/uploads/users';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '_' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Tệp tải lên không đúng định dạng. Vui lòng thử lại !'));
        }
    }
});

router.post('/create',
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'sub_avatar', maxCount: 1 }
    ]), userController.create);

router.get('/list', userController.list);

router.put('/update',
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'sub_avatar', maxCount: 1 }
    ]), userController.update);

router.post('/search', userController.search);

router.delete('/delete/:_id', userController.delete);

router.get('/detail/:_id', userController.detail);

module.exports = router;