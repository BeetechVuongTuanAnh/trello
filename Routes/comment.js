const express = require('express');
const multer = require('multer');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const commentController = require('../Controllers/CommentController');

const DIR = './public/uploads/comments';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '___' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post('/create', upload.array('files', 6), commentController.create);

router.get('/list/:_id', commentController.list);

router.get('/all', commentController.getAll);

router.put('/update', commentController.update);

router.post('/search', commentController.search);

router.delete('/delete/:_id', commentController.delete);

router.get('/detail/:_id', commentController.detail);

module.exports = router;