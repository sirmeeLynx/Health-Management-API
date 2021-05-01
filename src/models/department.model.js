const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactPerson: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ContactPerson',
      required: true,
    },
    metaData: [{
      key: {
       type: String,
       required: true,
       trim: true,
     }, 
      value: {
       type: String,
       required: true,
       trim: true,
     } 
   }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
departmentSchema.plugin(toJSON);

/**
 * @typedef Department
 */
const Department = mongoose.model('Department', userSchema);

module.exports = Department;
