const mongoose = require('mongoose');

// Schema
const setSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A set must have a name'],
      trim: true,
      maxLength: [
        40,
        'A tour name must have less than or equal to 40 characters',
      ],
      minLength: [
        5,
        'A tour name must have more than or equal to 10 characters',
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    description: {
      type: String,
      trim: true,
      // select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// VIRTUAL POPULATE NOTES
setSchema.virtual('notes', {
  ref: 'Note',
  foreignField: 'set',
  localField: '_id',
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
setSchema.pre('save', function (next) {
  console.log('Will save document...');
  next();
});

// DOCUMENT MIDDLEWARE: runs after .save() and .create()
setSchema.post('save', function (doc, next) {
  console.log('Document saved!');
  next();
});

// QUERY MIDDLEWARE
setSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  // this.start = Date.now();
  next();
});

const Set = mongoose.model('Set', setSchema);

module.exports = Set;
