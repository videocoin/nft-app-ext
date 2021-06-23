
const dai = require('../tokens/dai')
const mana = require('../tokens/mana')
const eth = require('../tokens/eth')
const weth = require('../tokens/weth')

const usersRecords = require('../users/users')

const asset = require('../assets/testerc1155')

const tokens = [
    dai.token, mana.token, eth.token, weth.token
]

const users = [
    usersRecords.null, usersRecords.taras, usersRecords.taras2, usersRecords.feeRecipient
]

function camelToUnderscore(key) {
    return key.replace( /([A-Z])/g, "_$1" ).toLowerCase();
}

function getToken(address) {
    for (let i = 0; i < tokens.length; ++i) {
        if (tokens[i].address.toLowerCase() == address.toLowerCase()) {
            return tokens[i];
        }
    }
    return undefined
}

function getUser(address) {
    for (let i = 0; i < users.length; ++i) {
        if (users[i].address.toLowerCase() == address.toLowerCase()) {
            return users[i]
        }
    }

    return undefined
}

module.exports = {
    postOrder: (req, res) => {
        let response = {}
        console.log(req.body)
        for(var key in req.body) {
            
            if (key == 'paymentToken') {
                let token = getToken(req.body[key])
                if (token) {
                    response['payment_token_contract'] = token
                    response['payment_token'] = req.body[key]
                    continue
                }
            } else if (key == 'maker' || key == 'taker') {
                let user = getUser(req.body[key])
                if (user) {
                    response[key] = user
                    continue
                }
            } else if (key == 'feeRecipient') {
                let user = getUser(req.body[key])
                if (user) {
                    response['fee_recipient'] = user
                }
            } else {
                response[camelToUnderscore(key)] = req.body[key];
            }
        }
        response['asset'] = asset.asset
        // console.log(response)
        return req.body ? res.status(200).json(response) : res.status(404).json({ success: false })
    }
}