const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    term: {
      type: String,
      required: [true, 'A note must have a term'],
    },
    definition: {
      type: String,
      required: [true, 'A note must have a definition'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    set: {
      type: mongoose.Schema.ObjectId,
      ref: 'Set',
      required: [true, 'Note must belong to a Set.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
noteSchema.pre('save', function (next) {
  console.log('Will save document...');
  next();
});

// DOCUMENT MIDDLEWARE: runs after .save() and .create()
noteSchema.post('save', function (doc, next) {
  console.log('Document saved!');
  next();
});

// QUERY MIDDLEWARE
// noteSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'set',
//     select: 'name',
//   });
//   next();
// });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
