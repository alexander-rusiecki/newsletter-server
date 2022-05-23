const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectToDB = require('./db/connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));

app.set('view engine', 'ejs');

const init = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () =>
      console.log(`Connected to database and server running on port: ${PORT}`)
    );
  } catch (error) {}
};

init();
