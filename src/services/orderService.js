import aplicationDB from '../models/index'
import Validate from './Validate'
import emailService from './emailService'


const createNewOrder = async (data) => {
    try {
        const {username, userId, productList, totalPrice, firstName, lastName, address, phoneNumber, email, note} = data
        if (!username || !userId || !productList || !totalPrice || !firstName || !lastName || !address || !phoneNumber) {
            return {
                errCode: 1,
                errMsg: 'Missing input parameters!'
            }
        }

        let user = await aplicationDB.User.findOne({where: {username}})

        if (!user) {
            return {
                errCode: 2,
                errMsg: 'User does not exist!'
            }
        }

        if (user.id != userId) {
            return {
                errCode: 1,
                errMsg: 'Invalid information!'
            }
        }

        await aplicationDB.Order.create({
            userId, productList, totalPrice, firstName, lastName, address, phoneNumber, email, note
        })

        let arr = JSON.parse(productList)
        for (let i = 0; i < arr.length; i++) {
            let product = await aplicationDB.Product.findOne({where: {id:arr[i].id}})
            await aplicationDB.Product.update({
                booked: product.booked + parseInt(arr[i].quantity)
            },{where:{id:arr[i].id}})
        }

        if(Validate.ValidateEmail(email)) {
            emailService.sendSimpleEmail(data, arr)
        } 

        return {
            errCode: 0,
            errMsg:'You order successfully!'
        }
        
    } catch (error) {
        console.log(error)
        return {
            errCode: -1,
            errMsg: 'Error Server!'
        }
    }
}

const getOrderHistory = async (username,id) => {
    try {
        let user = await aplicationDB.User.findOne({where: {username}})
        if (!user) return {
            errCode: 2,
            errMsg: 'User does not exist!'
        }
        if (id) {
            let order = await aplicationDB.Order.findOne({where: {userId: user.id, id}})
            return {
                errCode: 0,
                data: order
            }
        }
        let orders = await aplicationDB.Order.findAll({where: {userId: user.id}})
        return {
            errCode: 0,
            data: orders
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
    createNewOrder, getOrderHistory
}