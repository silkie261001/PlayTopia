const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    requires: true,
    max: 32,
  },
  email: {
    type: String,
    trim: true,
    requires: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    min: 6,
    max: 64,
    required: true,
  },
  friends: [{ type: Schema.Types.Object, ref: 'User' }],
});

module.exports = mongoose.model('User', userSchema);
