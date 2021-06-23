const express = require('express')
const router = express.Router()

const tokensService = require('../services/tokens.js')

router.get('/', tokensService.getTokens)

module.exports = router