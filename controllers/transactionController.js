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
        transaction.product_list.forEach((product) => { //from line 18 to 27 is the step to update the Stock after each transaction
          Product.findOne({_id: product.product}, function(err,result) {
            if(err){
              res.send({error:err})
            } else {
              result.stock = result.stock - product.quantity
              result.save()
            }
          })
        })

        res.send(transaction)

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
        deletedTransaction.product_list.forEach((product) => { //from line 88 to 97 is the step to update the Stock after deleting Trx
          Product.findOne({_id: product.product}, function(err,result) {
            if(err){
              res.send({error:err})
            } else {
              result.stock = result.stock + product.quantity //stock is updated here
              result.save()
            }
          })
        })

        res.send(deletedTransaction);
      }
    })
  }

}
