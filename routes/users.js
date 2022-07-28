const { request } = require('express');
const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const User = require('../models/User');
const Item = require('../models/Item');

Router.get('/', (req, res) => {
  User.find()
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

Router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ data: user });
  } catch (error) {
    res.json({ error: error.message });
  }
});

Router.post('/register', async (req, res) => {
  console.log(req.body);

  const password = await bcrypt.hash(req.body.password, 10);
  const newItem = new User({ ...req.body, password, role: 'user' });

  newItem
    .save()
    .then((data) => {
      res.json({ data, message: 'User added successfully' });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

Router.delete('/:id', (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((data) => {
      console.log(data);
      res.json({ message: 'User deleted' });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

// Router.put('/:id', (req, res) => {
//   console.log(req.params.id);
//   User.updateOne({ _id: req.params.id }, req.body)
//     .then((data) => {
//       console.log(data);

//       let message = 'No changes found';
//       if (data.modifiedCount == 1) {
//         res.json({ message: 'User was successfully updated' });
//       }
//       res.json({ message });
//     })
//     .catch((error) => {
//       res.json({ error: error.message });
//     });
// });

Router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      res.json({ error: 'Username is not registered' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.json({ error: 'Username or Password is incorrect' });
      return;
    }

    res.json({ data: user });
  } catch (error) {
    res.json({ error: error.message });
  }
});

Router.post('/buy', async (req, res) => {
  try {
    const { itemsBought } = await User.findOne({ _id: req.body.id });

    const user = await User.findByIdAndUpdate(req.body.id, {
      itemsBought: [...itemsBought, ...req.body.items],
    });

    const items = await Item.updateMany(
      { _id: { $in: req.body.items } },
      { status: false }
    );

    res.json({ data: items });
  } catch (error) {
    res.json({ error: error.message });
  }
});

Router.post('/bought', async (req, res) => {
  try {
    const { itemsBought } = await User.findOne({ _id: req.body.id }).populate(
      'itemsBought'
    );
    res.json({ data: itemsBought });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = Router;
