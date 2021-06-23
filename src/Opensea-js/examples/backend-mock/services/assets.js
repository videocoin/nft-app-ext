const erc1155 = require('../assets/testerc1155')
const erc1155_2 = require('../assets/testerc1155-2')
const daierc20 = require('../assets/daierc20')

const assets = [
    erc1155, daierc20, erc1155_2
]

function getAsset(params, asset) {
    const isAsset = (params.token && (params.token.toLowerCase() === asset.contractAddress.toLowerCase())) && 
        (params.id && (params.id === asset.tokenID))
    return isAsset ? asset : undefined
}

module.exports = {
    getAsset: (req, res) => {
        let asset = undefined;

        for (let i = 0; i < assets.length; ++i) {
            asset = getAsset(req.params, assets[i])
            if (asset) break;
        }
        return asset ? res.status(200).json(asset.asset) : res.status(404).json({ success: false })
    }
}