import aplicationDB from '../models/index'
import productService from '../services/productService'

const handleGet = async (req, res) => {
    try {
        const id = req.query.id
        let result = await productService.getProducts(id)
        if (result) {
            return res.status(200).json(result)
        }
        return res.status(200).json({
            errCode: 1,
            errMsg: 'There\'s no suitable product.'
        })
    } catch (error) {
        console.log('controller', error)
        return res.status(200).json({
            errCode: -1,
            errMsg: 'Error Server'
        })
    }
}

const handleGetProductByIdList = async (req, res) => {
    try {
        let idList = req.query.idList
        if (!idList) return res.status(200).json({
            errCode: 1,
            errMsg: 'Missing input parameters!'
        })
        let result = await productService.getProductsByIdList(JSON.parse(idList))
        return res.status(200).json(result)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMsg: 'Error Server'
        })
    }
}

const handleGetProductFromMyStore = async (req, res) => {
    try {
        let data = req.body
        let result = await productService.getProductsFromMyStore(data)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMsg: 'Error Server'
        })
    }
}

const handleAddProductInfo = async(req, res)=>{
    try {
        let data = req.body
        let result = await productService.addProductInfo(data)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMsg: 'Error Server'
        })
    }
}

const handleUpdateProductInfo = async(req, res)=>{
    try {
        let data = req.body
        let result = await productService.updateProductInfo(data)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMsg: 'Error Server'
        })
    }
}

const handleAddQuantityToInventory = async (req, res) =>{
    try {
        let data = req.body
        let result = await productService.addQuantityToInventory(data)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMsg: 'Error Server'
        })
    }
}

const handleDeleteProduct = async (req, res) =>{
    try {
        let data = req.body
        let result = await productService.deteleProduct(data)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMsg: 'Error Server'
        })
    }
}

const handleFBLogin = async(req, res) =>{
    let data = req.body.data
    const {token,redirectUri} = data
    let uriX2 = encodeURIComponent(redirectUri)
    let uri02 = `http://graph.facebook.com/v8.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${uriX2}&client_secret=${process.env.FACEBOOK_SECRET_KEY}&code=${token}`
    try {
        return  res.status(200).json({uriX2,uri02})
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMsg: 'Error Server'
        })
    }
}

const handleSearchProducts = async (req, res) => {
    try {
        let keyWord = req.query.keyWord
        // let result = await productService.searchProduct(keyWord)
        return res.status(200).json({})
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMsg: 'Error Server'
        })
    }
}

module.exports = {
    handleGet, handleAddProductInfo,
    handleAddQuantityToInventory,
    handleFBLogin,handleGetProductFromMyStore,
    handleUpdateProductInfo, handleDeleteProduct,
    handleGetProductByIdList,
    handleSearchProducts,
}