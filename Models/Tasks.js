/**
 * constants
 */
const Validation = require('./../Constants/validation');
const TypeCode = require('../Constants/typeCode');

/**
 * packet
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * define schema
 */
const taskSchema = new Schema({
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    category: { type: Number },
    title: { type: String },
    description: { type: String },
    status: { type: Number },
    parent_task: {type: Schema.Types.ObjectId, ref: 'Task', default: new mongoose.Types.ObjectId},
    priority: { type: Number },
    task_start_date: {type: Date},
    task_end_date: {type: Date},
    assign: {type: Schema.Types.ObjectId, ref: 'User'},
    user_create: {type: Schema.Types.ObjectId, ref: 'User'},
    estimate_time: { type: Number },
    actual_time: { type: Number },
    files: [{type: String}],
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    delete_flag: { type: Number, default: TypeCode.DELETE_FLAG.FALSE }
});

module.exports = mongoose.model('Task', taskSchema);