const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');

router.get('/', async (req, res) => {
  const rental = await Rental.find().sort('-dateOut');
  res.send(rental);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0)
    return res.status(400).send('Movie not in stock.');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      await movie.updateOne({ $inc: { numberInStock: -1 } }, { session });
      rental = await rental.save({ session });
    });

    res.send(rental);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send('Something failed.');
  } finally {
    session.endSession();
  }
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router;
