import aplicationDB from '../models/index'

const getProducts = async (id) => {
    try {
        let result
        if (!id) {
            result = await aplicationDB.Product.findAll()
        } else {
            result = await aplicationDB.Product.findOne({
                where: { id },
                include: [
                    { model: aplicationDB.User, as: 'sellerData', attributes: ['firstName', 'lastName'] },
                ],
                raw: false,
                nest: true
            })
        }
        console.log('service',result)
        return {
            errCode: 0,
            data: result
        }
    } catch (error) {
        console.log(error)
        return {
            errCode: -1,
            errMsg: 'Error Server!'
        }
    }
}

const getProductsByIdList = async (list) => {
    try {
        let result = []
        for (let index = 0; index < list.length; index++) {
           let product = await aplicationDB.Product.findOne({where: {id: list[index]}})
           if(product) {
            result.push(product)
           }
        }
        return {
            errCode: 0,
            data: result
        }
    } catch (error) {
        console.log(error)
        return {
            errCode: -1,
            errMsg: 'Error Server!'
        }
    }
}

const getProductsFromMyStore = async (data) => {
    try {
        const {username} = data
        let user = await aplicationDB.User.findOne({where:{username}})
        let productList = await aplicationDB.Product.findAll({where: {sellerId: user.id}})
        return {
            errCode: 0,
            data: productList
        }
    } catch (error) {
        console.log(error)
        return {
            errCode: -1,
            errMsg: 'Error Server!'
        }
    }
}

const addProductInfo = async (data) =>{
    try {
        const {name, price, image, username, type, detailsDescription, summary} = data
        if (!name || !price || !image || !type) return {
            errCode: 1,
            errMsg: 'Missing input parameters!'
        }
        let user = await aplicationDB.User.findOne({where:{username}})
        console.log(user)
        await aplicationDB.Product.create({
            name,
            price,
            image,
            type,
            summary,
            detailsDescription,
            total: 0,
            booked:0,
            sellerId: user.id
        })
        return {
            errCode: 0,
            errMsg: 'Add a new product successfully!'
        }
            
    } catch (error) {
        console.log(error)
        return {
            errCode: -1,
            errMsg: 'Error Server!'
        }
    }
}

const updateProductInfo = async (data) =>{
    try {
        const {id, name, price, image, type, summary, detailsDescription} = data
        if (!name || !price || !image || !type || !id) return {
            errCode: 1,
            errMsg: 'Missing input parameters!'
        }

        await aplicationDB.Product.update({
            name,
            price,
            image,
            type,
            summary,
            detailsDescription,
        }, {where: {id}})
        return {
            errCode: 0,
            errMsg: 'Update product info successfully!'
        }
            
    } catch (error) {
        console.log(error)
        return {
            errCode: -1,
            errMsg: 'Error Server!'
        }
    }
}

const deteleProduct = async (data) =>{
    try {
        const {id} = data
        if (!id) return {
            errCode: 1,
            errMsg: 'Missing input parameters!'
        }

        await aplicationDB.Product.destroy({where: {id}})
        return {
            errCode: 0,
            errMsg: 'Delete product successfully!'
        }
            
    } catch (error) {
        console.log(error)
        return {
            errCode: -1,
            errMsg: 'Error Server!'
        }
    }
}

const addQuantityToInventory = async(data) =>{
    const {productId, quantity, username} = data
    try {
        if(!productId || !quantity) return {
            errCode: 2,
            errMsg:'Missing input parameters!'
        }
        let user = await aplicationDB.User.findOne({where:{username}})
        let product = await aplicationDB.Product.findOne({where: {id: productId, sellerId: user.id}})
        if (!product) return {
            errCode: 2,
            errMsg: 'This Product does not exist in database!'
        } 
        let quan = typeof quantity == 'number' ? quantity : parseInt(quantity)
        let old = typeof product.total == 'number' ? product.total : parent(product.total)
        await aplicationDB.Product.update({
            total: old + quan
        }, {where: {id: productId}})
        return {
            errCode: 0,
            errMsg: 'Update successfully!'
        }
    } catch (error) {
        console.log(error)
        return {
            errCode: -1,
            errMsg: 'Error Server!'
        }
    }
}

module.exports = {
    getProducts,addProductInfo,updateProductInfo,
    addQuantityToInventory,getProductsFromMyStore,
    deteleProduct, getProductsByIdList,
}