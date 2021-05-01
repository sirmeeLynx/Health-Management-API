const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON } = require('./plugins');

const contactPersonSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    telephone: {
      type: String,
      required: true,
      trim: true,
      minlength: 11,
      validate(value) {
        if (!value.match(/\d/g)) {
          throw new Error('Telephone must contain only numbers');
        }
      },
    },
    metaData: [
      {
        key: {
          type: String,
          required: true,
          trim: true,
        },
        value: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
contactPersonSchema.plugin(toJSON);

/**
 * @typedef ContactPerson
 */
const ContactPerson = mongoose.model('ContactPerson', contactPersonSchema);

module.exports = ContactPerson;
