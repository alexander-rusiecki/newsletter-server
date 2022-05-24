const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectToDB = require('./db/connection');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use('/api/v1', authRoutes);
app.use('/api/v1/admin', adminRoutes);

app.set('view engine', 'ejs');

const init = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () =>
      console.log(`Connected to database and server running on port: ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

init();
