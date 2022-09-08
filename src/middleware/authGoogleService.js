import cookieService from '../services/cookieService';

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

async function verify(req, res, next) {
    try {
        let token = req.body.tokenId
        const ticket = await client.verifyIdToken({
            idToken: token,
        });
        const payload = ticket.getPayload();
        console.log('valid gg account')
        req.body.payload = payload
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            errCode: 1,
            errMsg: "Unauthorized!"
        });
    }
}
export default {
    verify,
}