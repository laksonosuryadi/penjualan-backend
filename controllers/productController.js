'use strict'

var Product = require('../models/product');

module.exports = {
  getAllProducts: (req, res) => {
    Product.find((err, products) => {
      if(err) {
        res.send({error:err})
      } else {
        res.send(products)
      }
    });
  },

  addProduct: (req, res) => {
    Product.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock
    }, function(err, product) {
      if(err){
        res.send(err)
      } else {
        res.send(product)
      }
    });
  },

  deleteProduct: (req, res) => {
    Product.findByIdAndRemove(req.params.productId, (err, deletedProduct) => {
      if(err){
        res.send({error:err})
      } else {
        res.send(deletedProduct)
      }
    });
  },

  updateProduct: (req, res) => {
    Product.findOneAndUpdate(
      {
        _id : req.params.productId
      },
      {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock
      }, (err, product) => {
        if(err){
          res.send({error:err})
        } else {
          res.send(product)
        }
      })
  }
}
