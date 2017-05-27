'use strict'

var Transaction = require('../models/transaction')

module.exports = {
  addTransaction: (req, res) => {
    Transaction.create({
      product_list: req.body.product_list,
      date: (new Date).getDate(),
      month: ((new Date).getMonth())+1,
      year: (new Date).getFullYear()
    }, (err, transaction) => {
      if(err){
        res.send({error:err})
      } else {
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
