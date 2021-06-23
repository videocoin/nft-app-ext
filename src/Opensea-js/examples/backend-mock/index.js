const express = require('express')
const assets = require('./routes/assets')
const tokens = require('./routes/tokens')
const orders = require('./routes/orders')

const app = express()

const API_PATH = '/api/v1'
const ORDER_PATH = '/wyvern/v1'


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(`${API_PATH}/asset`, assets)
app.use(`${API_PATH}/tokens`, tokens)
app.use(`${ORDER_PATH}/orders/post`, orders)

module.exports = app