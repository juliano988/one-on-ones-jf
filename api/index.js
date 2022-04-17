require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const auth = require('./auth');


app.use(cors());
app.use(express.json());

app.use(auth);

app.use('/api/auth/check_token', require('./auth/check_token'));
app.use('/api/login', require('./login'));
app.use('/api/teste', require('./teste'));

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`)
})
