require('dotenv').config();

const mongoose = require('mongoose');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/streaming')
  .then(console.log('Connected to MongoDB...'))
  .catch(console.log('Could not connect to MongoDB...'));


app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
