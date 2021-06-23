const express = require('express')
const router = express.Router()

const assetsService = require('../services/assets.js')

router.get('/:token/:id', assetsService.getAsset)

module.exports = router