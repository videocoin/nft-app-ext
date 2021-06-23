const dai = require('../tokens/dai')
const mana = require('../tokens/mana')
const eth = require('../tokens/eth')
const weth = require('../tokens/weth')

const tokens = [
    dai.token, mana.token, eth.token, weth.token
]

function getToken(query, token) {
    const isToken = (query.symbol && (query.symbol === token.symbol)) || 
        (query.address && (query.address.toLowerCase() === token.address.toLowerCase()))
    return isToken ? token : undefined
}

module.exports = {
    getTokens: (req, res) => {
        let token = undefined;

        for (let i = 0; i < tokens.length; ++i) {
            token = getToken(req.query, tokens[i])
            if (token) break;
        }

        return token ? res.status(200).json([token]) : res.status(404).json({ success: false })
    }
}