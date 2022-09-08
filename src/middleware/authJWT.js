import jwt from 'jsonwebtoken'
import aplicationDB from '../models/index'
import cookieService from '../services/cookieService';
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        let result = {
            errCode: 1,
            errMsg: "Unauthorized! Access Token was expired!"
        }
        return res.sendStatus(403).send(result);
    }
    return res.sendStatus(400).send({
        errCode: 1,
        errMsg: "Unauthorized!"
    });
}
const verifyToken = (req, res, next) => {
    let accessoken = req.headers['x-access-token']
    console.log('header: ',req.headers)
    if (!accessoken) {
        console.log('user invalid')
        return res.sendStatus(400).send({
            errCode: 3,
            errMsg: "No access token provided!"
        });
    }
    jwt.verify(accessoken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        console.log('user valid')
        req.body.username = decoded.username;
        next();
    });
};

const checkTokenWhenStart = (req, res, next) => {
    let accessoken = cookieService.getCookie(req.headers.cookie,'accessToken')
    if (!accessoken) {
        return res.status(200).json({
            errCode: 1,
            errMsg: "No access token provided!"
        });
    }
    jwt.verify(accessoken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(200).json({
                errCode: 2,
                errMsg: "Unauthorized!"
            });
        }
        req.body.username = decoded.username;

        next();
    });
};

export default {
    verifyToken, checkTokenWhenStart,
}