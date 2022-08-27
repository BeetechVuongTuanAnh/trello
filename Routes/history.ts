import express = require('express');
const router = express.Router();

const historyController = require('../Controllers/HistoryController');

router.post('/create', historyController.create);

router.get('/list/:_id', historyController.list);

router.get('/search/:_id', historyController.search);

router.get('/all', historyController.all);

module.exports = router;