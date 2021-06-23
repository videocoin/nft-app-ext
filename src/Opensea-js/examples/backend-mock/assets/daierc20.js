const owner = require('../users/users').null
const ADDRESS = '0x5ca6ba24df599d26b0c30b620233f0a11f7556fa'
const TOKEN_ID = '0'

const asset_contract = {
    address: ADDRESS,
    name: 'Dai Stablecoin',
    asset_contract_type: 'fungible',
    schema_name: 'ERC20',
    symbol: '',
    buyer_fee_basis_points: 0,
    seller_fee_basis_points: 250,
    opensea_buyer_fee_basis_points: 0,
    opensea_seller_fee_basis_points: 250,
    dev_buyer_fee_basis_points: 0,
    dev_seller_fee_basis_points: 0,
    image_url: '',
    external_link: '',
    wiki_link: '',
    collection: [],
    orders: [],
    is_presale: false,
    image_url: '',
    image_preview_url: '',
    image_thumbnail_url: '',
    external_link: '',
    perma_link: '',
    traits: '',
    num_sales: 0,
}

const collection = {
    dev_buyer_fee_basis_points: '0',
    dev_seller_fee_basis_points: '0',
    opensea_buyer_fee_basis_points: '0',
    opensea_seller_fee_basis_points: '250'
}

const asset = {
    token_id: TOKEN_ID,
    name: 'Dai Stablecoin',
    description: null,
    owner: owner,
    asset_contract: asset_contract,
    collection: collection
}

module.exports = {
    contractAddress: ADDRESS,
    tokenID: TOKEN_ID,
    asset: asset
}