'use strict'

var Product = require('../models/product');

module.exports = {
  addProduct: (req, res) => {
    Product.create({
      name : req.body.name,
      price : req.body.price
    }, function(err, product) {
      if(err){
        res.send(err)
      } else {
        res.send(product)
      }
    });
  },

  getAllProducts: (req, res) => {
    Product.find((err, products) => {
      if(err) {
        res.send({error:err})
      } else {
        res.send(products)
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
        name : req.body.name,
        price : req.body.price
      }, (err, product) => {
        if(err){
          res.send({error:err})
        } else {
          res.send(product)
        }
      })
  }
}
