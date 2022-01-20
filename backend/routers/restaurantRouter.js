const express = require('express')
const Restaurant = require('../models/restaurantModel')

const restaurantRouter = express.Router()

//get restaurants
restaurantRouter.get('/all', async (req, res) => {
  let perpage = +req.query.perpage
  let page = +req.query.page
  let borough = req.query.borough
  let condition = !borough ? null : { borough }

  const total = await Restaurant.find(condition).countDocuments()

  const restaurants = await Restaurant.find(condition)
    .sort({ restaurant_id: 1 })
    .skip(perpage * (page - 1))
    .limit(perpage)

  res.json({ status: 200, total, restaurants })
})

//get a restaurant
restaurantRouter.get('/:id', async (req, res) => {
  const restaurant = await Restaurant.findOne({
    _id: req.params.id
  })

  res.json({ status: 200, restaurant })
})

module.exports = restaurantRouter
