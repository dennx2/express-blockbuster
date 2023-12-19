require('dotenv').config();

const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const express = require('express');
const app = express();

// Run the server
// mongod --dbpath="d:\data\db" --replSet rs0
// Connect with Client
// mongosh mongodb://127.0.0.1:27017?replicaSet=rs0

mongoose
  .connect(
    'mongodb://127.0.0.1:27017/streaming?replicaSet=rs0',
    { family: 4 } // Force IPv4
  )
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
