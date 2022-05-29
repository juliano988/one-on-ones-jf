require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URI); 

const UserSchema = new mongoose.Schema({
  name: String,
  teamName: String,
  userName: String,
  password: String,
  role: String,
  _id_meeting: [{ type: mongoose.Types.ObjectId, ref: 'meetings' }]
});

const MeetingSchema = new mongoose.Schema({
  place: String,
  date: Date,
  done: Boolean,
  _id_user: [{ type: mongoose.Types.ObjectId, ref: 'users' }]
});

exports.UserModel = mongoose.model('users', UserSchema);
exports.MeetingModel = mongoose.model('meetings',MeetingSchema);