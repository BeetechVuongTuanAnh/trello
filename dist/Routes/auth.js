"use strict";
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');
router.post('/login', authController.login);
router.put('/change-password', authController.change);
router.delete('/reset-password/:_id', authController.reset);
module.exports = router;
