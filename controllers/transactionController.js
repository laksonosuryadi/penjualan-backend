'use strict'

var Transaction = require('../models/transaction')
var Product = require('../models/product')

module.exports = {
  addTransaction: (req, res) => {
    Transaction.create({
      product_list: req.body.product_list,
      total: req.body.total,
      date: (new Date).getDate(),
      month: ((new Date).getMonth())+1,
      year: (new Date).getFullYear()
    }, (err, transaction) => {
      if(err){
        res.send({error:err})
      } else {
        var counter = 0
        transaction.product_list.forEach((product) => {
          Product.find({_id: product.product}, function(err,res) {
            if(err){
              res.send({error:err})
            } else {
              res.stock = res.stock - +(product.quantity)
              res.save((err, updatedStock) => {
                if(err) {
                  res.send({error:err})
                } else {
                  counter++
                }
              })
            }
          })
        })
        if(counter == transaction.product_list.length){
          res.send(transaction)
        }
      }
    })
  },

  getTransaction: (req, res) => {
    Transaction.find()
      .populate('product_list.product')
      .exec((err, transactions) => {
      if(err) {
        res.send({error:err})
      } else {
        res.send(transactions)
      }
    })
  },

  getTransactionByDate: (req, res) => {
    Transaction.find({date: req.params.date, month: req.params.month, year: req.params.year})
    .populate('product_list.product')
    .exec((err, transactions) => {
      if(err){
        res.send({error: err});
      } else {
        res.send(transactions);
      }
    })
  },

  getTransactionByMonth: (req, res) => {
    Transaction.find({month: req.params.month, year: req.params.year})
    .populate('product_list.product')
    .exec((err, transactions) => {
      if(err){
        res.send({error: err});
      } else {
        res.send(transactions);
      }
    })
  },

  getTransactionByYear: (req, res) => {
    Transaction.find({year: req.params.year})
    .populate('product_list.product')
    .exec((err, transactions) => {
      if(err){
        res.send({error: err});
      } else {
        res.send(transactions);
      }
    })
  },

  deleteTransaction: (req, res) => {
    Transaction.findByIdAndRemove(req.params.id, (err, deletedTransaction) => {
      if(err) {
        res.send({error:err});
      } else {
        res.send(deletedTransaction);
      }
    })
  }

}
