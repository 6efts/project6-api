const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: Object,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
});

// Singular version of the collection name
module.exports = mongoose.model('Item', ItemSchema);
