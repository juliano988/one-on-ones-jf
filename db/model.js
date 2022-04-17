require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URI);

const UserSchema = new mongoose.Schema({
  name: String,
  teamName: String,
  userName: String,
  password: String,
  role: String
});

exports.UserModel = mongoose.model('users', UserSchema);