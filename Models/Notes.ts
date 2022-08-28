
/**
 * packet
 */
 import mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 /**
  * constants
  */
  const Validation = require('../Constants/validation');
  const TypeCode = require('../Constants/typeCode');
  
/**
 * define schema
 */
const noteSchema = new Schema({
    message: { type: String },
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    delete_flag: { type: Number, default: TypeCode.DELETE_FLAG.FALSE }
});

module.exports = mongoose.model('Note', noteSchema);