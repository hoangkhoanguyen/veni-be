import aplicationDB from '../models/index'
import { application } from 'express'
import userService from '../services/userService'
import emailService from '../services/emailService'
import Validate from '../services/Validate'

const handleLogin = async (req, res) => {
    try {
        const data = await req.body
        const { username, password } = data
        if (!username || !password) {
            return res.status(500).json({
                errorCode: 1,
                message: 'Missing inputs parameter!'
            })
        }
        let result = await userService.login(data)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errMsg: 'Error server!'
        })
    }
}

const handleUpdateInfo = async ( req, res) => {
    try {
        let data = req.body
        let result = await userService.updateInfo(data)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errMsg: 'Error server!'
        })
    }
}

const handleLoginWithGoogle = async (req, res) => {
    try {
        const { email } = req.body.payload
        let result = await userService.loginWithGoogle(email)
        return res.status(200).json(result)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errMsg: 'Error server!'
        })
    }
}

const handleLoginWithFacebook = async (req, res) => {
    try {
        const { email } = req.body.data
        console.log('controller: ',req.body.data)
        let result = await userService.loginWithFacebook(email)
        return res.status(200).json(result)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errMsg: 'Error server!'
        })
    }
}

let handleAddNewUser = async (req, res) => {
    try {
        const data = await req.body
        const {username, password, firstName, lastName} = data

        //validate
        if (!username || !password || !firstName || !lastName) {
            return res.status(200).json({
                errCode: 1,
                errMsg: `Missing parameters!`
            })
        }

        //create
        const result = await userService.createNewUser(data)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errMsg: 'Error server!'
        })
    }
}

const handleLinkToGoogleAccount = async (req, res) => {
    try {
        let data = req.body.payload
        let username = req.body.username
        let result = await userService.linkToGoogle({
            ...data,
            username
        })
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errMsg: 'Error server!'
        })
    }
}


const handleLinkToFacebookAccount = async (req, res) => {
    try {
        let data = req.body.data
        console.log(data)
        let username = req.body.username
        let result = await userService.linkToFacebook({
            ...data,
            username
        })
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errMsg: 'Error server!'
        })
    }
}


const handleCheckAuth = async (req, res) => {
    try {
        let username = req.body.username
        let user = await aplicationDB.User.findOne({
            where: {username},
            raw: true
        })
        delete user.password
        return res.status(200).json({
            errCode: 0,
            data: user
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errMsg: 'Error server!'
        })
    }
}

const handleSendMessageToAdmin = async (req, res) => {
    try {
        let {content, email, name} = req.body

        await emailService.sendMessageToAdmin({content, email, name})
        return res.status(200).json({
            errCode: 0,
            errMsg: "Your message has already sent!"
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMsg: 'Error server!'
        })
    }
}

module.exports = {
    // handleLogin: handleLogin,
    // handleGetAllUsers: handleGetAllUsers,
    handleAddNewUser,
    handleLogin,
    handleLinkToGoogleAccount,
    handleLoginWithGoogle,
    handleLoginWithFacebook,
    handleCheckAuth,
    handleUpdateInfo,
    handleLinkToFacebookAccount,
    handleSendMessageToAdmin,
    // handleEditUser: handleEditUser,
    // handleDeleteUser: handleDeleteUser,
    // handleGetHash, handleTestJWT
}