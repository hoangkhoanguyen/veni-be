// import applicationDB from '../models/index'
import orderService from '../services/orderService'


const handleCreateNewOrder = async (req, res) => {
    try {
        let data = req.body
        let result = await orderService.createNewOrder(data)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMsg: 'Error Server'
        })
    }
}

const handleGetOrderHistory = async (req, res) => {
    try {
        let username = req.body.username
        let id = req.query.id
        let result = await orderService.getOrderHistory(username, id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMsg: 'Error Server'
        })
    }

}

module.exports = {
    handleCreateNewOrder,
    handleGetOrderHistory
}