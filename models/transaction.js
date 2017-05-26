const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  product_list: [{
    quantity: Number,
    product: { type: Schema.Types.ObjectId, ref: 'Product' }
  }],
  date: Number,
  month: Number,
  year: Number
}, {
  timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
