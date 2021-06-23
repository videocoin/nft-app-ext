const express = require('express')
const router = express.Router()

const ordersService = require('../services/orders.js')

router.post('/', ordersService.postOrder)

module.exports = router