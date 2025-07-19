const mongoose = require('mongoose');

const ProfilesSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  age: Number,
  board: { type: String, default: null },
  userClass: String,
  language: String,
  phone: { type: String, default: null },

  availability: {
    type: String,
    default: 'flexible',
  },
  chatOnly: {
    type: Boolean,
    default: false,
  },

  strongSubjects: {
    type: [String],
    default: [],
  },
  weakSubjects: {
    type: [String],
    default: [],
  },

  profileImage: {
    type: String,
    default: 'https://tse4.mm.bing.net/th/id/OIP.dDKYQqVBsG1tIt2uJzEJHwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
  }
});

module.exports = mongoose.model('Profiles', ProfilesSchema);