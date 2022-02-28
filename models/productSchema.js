const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   discription: {
      type: String,
      required: [true, 'please enter the product discription'],
   },
   image: {
      type: String,
      required: [true, 'please enter the product image'],
   },
   price: {
      type: Number,
      required: [true, 'plase enter the product price'],
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const product = new mongoose.model('product', productSchema);

module.exports = product;
