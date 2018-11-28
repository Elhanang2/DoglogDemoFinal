const mongoose = require('mongoose');
const VolunteerSessionSchema = new mongoose.Schema({
  volunteerId: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model('VolunteerSession', VolunteerSessionSchema);