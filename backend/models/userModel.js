const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  userName: {
    type: String,
    required: [true, 'User must have a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    select: false,
    minLength: 8,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

// DOCUMENT MIDDLEWARE: runs after .save() and .create()
// userSchema.post('save', function (next) {
//   this.select('-password');
//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
