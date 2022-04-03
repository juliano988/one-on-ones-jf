const express = require('express');
const app = express();

app.use('/api/teste',require('./teste'));

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`)
})
