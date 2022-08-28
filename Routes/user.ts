import express = require('express');
const multer = require('multer');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const userController = require('../Controllers/UserController');

const DIR = './public/uploads/users';

const storage = multer.diskStorage({
    destination: (req: express.Request, file: any, cb: any) => {
        cb(null, DIR);
    },
    filename: (req: express.Request, file: any, cb: any) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '_' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req: express.Request, file: any, cb: any) => {
        console.log(file);
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/) || file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            
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