/**
 * constants
 */
const Validation = require('../Constants/validation');
const TypeCode = require('../Constants/typeCode');

/**
 * packet
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * define schema
 */
const historySchema = new Schema({
    task: { type: Schema.Types.ObjectId, ref: 'Task' },
    project: {type: Boolean, default: false},
    old_project: {type: Schema.Types.ObjectId, ref: 'Project', default: new mongoose.Types.ObjectId},
    new_project: {type: Schema.Types.ObjectId, ref: 'Project', default: new mongoose.Types.ObjectId},
    title: {type: Boolean, default: false},
    old_title: {type: String},
    new_title: {type: String},
    description: {type: Boolean, default: false},
    category: {type: Boolean, default: false},
    old_category: {type: Number},
    new_category: {type: Number},
    status: {type: Boolean, default: false},
    old_status: {type: Number},
    new_status: {type: Number},
    priority: {type: Boolean, default: false},
    old_priority: {type: Number},
    new_priority: {type: Number},
    assign: {type: Boolean, default: false},
    old_assign: {type: Schema.Types.ObjectId, ref: 'User', default: new mongoose.Types.ObjectId},
    new_assign: {type: Schema.Types.ObjectId, ref: 'User', default: new mongoose.Types.ObjectId},
    task_start_date: {type: Boolean, default: false},
    old_task_start_date: {type: Date},
    new_task_start_date: {type: Date},
    task_end_date: {type: Boolean, default: false},
    old_task_end_date: {type: Date},
    new_task_end_date: {type: Date},
    estimate_time: { type: Boolean, default: false },
    old_estimate_time: {type: String},
    new_estimate_time: {type: String},
    actual_time: { type: Boolean, default: false },
    old_actual_time: {type: String},
    new_actual_time: {type: String},
    user_create: {type: Schema.Types.ObjectId, ref: 'User'},
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    delete_flag: { type: Number, default: TypeCode.DELETE_FLAG.FALSE }
});

module.exports = mongoose.model('History', historySchema);