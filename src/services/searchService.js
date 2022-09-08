import applicationDB from '../models/index'

const getSearchData = async (data, type) => {
    try {

    } catch (error) {
        console.log(error)
        return {
            errCode: -1,
            errMsg: 'Error Server!'
        }
    }
}

module.exports = {
    getSearchData
}