const owner = require('../users/users').taras
const ADDRESS = '0xA1DC45Fd27A498BB500184571c0bE17B094A903f'
const TOKEN_ID = '777'

const asset_contract = {
    address: ADDRESS,
    name: '',
    asset_contract_type: '',
    schema_name: 'ERC1155',
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
    name: 'Big Buck Bunny',
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