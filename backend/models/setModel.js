const mongoose = require('mongoose');

// TODO: Create field for numNotes and calculate the number of notes each set has

// Schema
const setSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A set must have a name'],
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
      required: [true, 'A set must have a name'],

      // select: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Set must belong to a User.'],
    },
    secretSet: {
      type: Boolean,
      default: false,
      select: false,
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
  // count: true,
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
setSchema.pre('save', function (next) {
  console.log('Will save document...');
  next();
});

// DOCUMENT MIDDLEWARE: runs after .save() and .create()
setSchema.post('save', function () {
  console.log('Document saved!');
  // next();
});

// QUERY MIDDLEWARE
setSchema.pre(/^find/, function (next) {
  this.find({ secretSet: { $ne: true } });
  // this.start = Date.now();
  next();
});

// setSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'user',
//     select: 'name email',
//   });
//   next();
// });

// aggregation

const Set = mongoose.model('Set', setSchema);

module.exports = Set;
