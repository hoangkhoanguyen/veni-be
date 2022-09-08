// import applicationDB from '../models/index'
import cookieService from '../services/cookieService'
import tokenService from '../services/tokenService'


const handleGetNewTokenByRefreshToken = async (req, res) => {
    try {
        let userId = req.body.userId
        let refreshToken = cookieService.getCookie(req.headers.cookie,'refreshToken')
        let result = await tokenService.getNewTokenByRefreshToken(userId, refreshToken)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMsg: 'Error Server'
        })
    }
}

module.exports = {
    handleGetNewTokenByRefreshToken,
}