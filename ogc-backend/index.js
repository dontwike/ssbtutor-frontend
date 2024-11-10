const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const verifyToken = require('./middleware/Authorization');
const dotenv = require('dotenv').config();
const Router = require('./routes/Auth');

app.use(bodyParser.json());
app.use('/', Router);

app.listen(process.env.PORT, () => {
    console.log('listening to port ' + process.env.PORT);
})