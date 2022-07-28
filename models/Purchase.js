const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
  },
  dateOfPurchased: String,
});

// Singular version of the collection name
module.exports = mongoose.model('Purchase', PurchaseSchema);
