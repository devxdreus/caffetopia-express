require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://8.215.11.16',
      'http://coffetopia.my.id',
      'https://coffetopia.my.id',
      'http://coffetopia.xyz',
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', routes);
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(process.env.PORT, () => {
  console.log(`App listen on http://localhost:${process.env.PORT}`);
});
