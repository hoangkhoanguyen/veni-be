import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import aplicationDB from '../models/index'

const createJWT = (username) => {

    let payload = {
        username
    }

    let key = process.env.JWT_SECRET_KEY
    try {
        let token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRATION })
        return token
    } catch (error) {
        console.log(error)
        return null
    }
}

const isExpiredRefreshToken = (expireDate) => {
    let date = new Date()
    return expireDate > date.getTime()
}

const getNewTokenByRefreshToken = async (userId, refreshToken) => {
    try {
        
        let refreshInfo = await aplicationDB.RefreshToken.findOne({
            where: {
                userId,
                token: refreshToken
            }
        })

        if (!refreshInfo) {
            return {
                errCode: 1,
                errMsg: 'Refresh Token is invalid!'
            }
        }
        let isValid = isExpiredRefreshToken(refreshInfo.expiryDate)
        if (!isValid) {
            console.log('refresh token expired')
            await aplicationDB.RefreshToken.destroy({
                where: { userId, token: refreshToken }
            })

            return {
                errCode: 2,
                errMsg: 'Refresh token was expired. Please re-login!'
            }
        }
        console.log(userId)
        let user = await aplicationDB.User.findOne({
            where: { id: userId }
        })

        if (!user) {
            return {
                errCode: 3,
                errMsg: "User does not exist anymore!"
            }
        }
        let newToken = createJWT(user.username)
        return {
            errCode: 0,
            data: {
                accessToken: newToken
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const createNewRefreshToken = async (id) => {
    try {
        let refreshToken = uuidv4()
        let expiredAt = new Date()
        expiredAt = expiredAt.setSeconds(expiredAt.getSeconds() +
            typeof process.env.JWT_REFRESH_EXPIRATION == 'number' ? process.env.JWT_REFRESH_EXPIRATION : parseInt(process.env.JWT_REFRESH_EXPIRATION))
        let refreshTokenInfo = await aplicationDB.RefreshToken.findOne({
            where: { userId: id }
        })
        if (refreshTokenInfo) {
            await aplicationDB.RefreshToken.update({
                token: refreshToken,
                expiryDate: expiredAt
            }, { where: { userId: id } })
        } else {
            await aplicationDB.RefreshToken.create({
                token: refreshToken,
                expiryDate: expiredAt,
                userId: id
            })
        }
        return refreshToken
    } catch (error) {
        console.log(error)
        return null
    }
}

export default {
    createJWT,
    createNewRefreshToken,
    getNewTokenByRefreshToken
}