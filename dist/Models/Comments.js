"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * packet
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * constants
 */
const Validation = require('../Constants/validation');
const TypeCode = require('../Constants/typeCode');
/**
 * define schema
 */
const commentSchema = new Schema({
    task: { type: Schema.Types.ObjectId, ref: 'Task' },
    comment: { type: String, required: true },
    user_create: { type: Schema.Types.ObjectId, ref: 'User' },
    user_edit: { type: Schema.Types.ObjectId, ref: 'User' },
    files: [{ type: String }],
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    delete_flag: { type: Number, default: TypeCode.DELETE_FLAG.FALSE }
});
module.exports = mongoose.model('Comment', commentSchema);
