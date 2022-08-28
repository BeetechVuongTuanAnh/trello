import express = require('express');
const router = express.Router();

const noteController = require('../Controllers/NoteController');

router.post('/create', noteController.create);

router.get('/list/:_id', noteController.list);

router.put('/update', noteController.update);

router.delete('/delete/:_id', noteController.delete);

module.exports = router;