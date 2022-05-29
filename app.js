const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const connectToDB = require('./db/connection');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 6000;
// maybe:
// app.set('trust proxy', 1);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(morgan('tiny'));
app.use(helmet());
app.use(xss());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(express.static('public'));
app.use('/admin', adminRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1', authRoutes);

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index', { title: 'Login' }));

app.use((req, res) =>
  res.status(404).render('404', { title: '404 - Not found' })
);

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
