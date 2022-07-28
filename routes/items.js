const express = require('express');
const Router = express.Router();

const Item = require('../models/Item');

Router.get('/', (req, res) => {
  Item.find({ status: true })
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

Router.post('/multiple', async (req, res) => {
  try {
    const items = await Item.find({ _id: { $in: req.body.ids } });
    res.json({ data: items });
  } catch (error) {
    res.json({ error: error.message });
  }
});

Router.get('/bought', (req, res) => {
  Item.find({ status: false })
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

Router.get('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

Router.post('/', (req, res) => {
  try {
    const { items } = req.body;

    console.log('items', items);

    const transformedItems = items.map(
      (item) => new Item({ ...item, status: true })
    );
    Item.insertMany(transformedItems)
      .then((data) => {
        res.json({
          data,
          message: 'Item added succesfully',
        });
      })
      .catch((error) => {
        res.json({ error: error.message });
      });
  } catch (error) {
    res.json({ error: error.message });
  }
});

Router.delete('/:id', (req, res) => {
  Item.deleteOne({ _id: req.params.id })
    .then((data) => {
      console.log(data);
      res.json({ message: 'Item deleted' });
    })
    .catch((error) => {
      res.json({
        error: error.message,
      });
    });
});

Router.put('/:id', (req, res) => {
  console.log(req.params.id);
  Item.updateOne({ _id: req.params.id }, req.body)
    .then((data) => {
      console.log(data);
      let message = 'No changes found';

      if (data.modifiedCount == 1) {
        message = 'Item was successfully updated';
      }

      res.json({ message });
    })
    .catch((error) => {
      res.json({
        error: error.message,
      });
    });
});

module.exports = Router;
