import axios from "axios";

const verify = async (req, res, next) => {
    try {
        let accesstoken = req.body.accessToken
        let result = await axios({
            url: 'https://graph.facebook.com/me',
            method: 'get',
            params: {
              fields: ['id', 'email', 'first_name', 'last_name'].join(','),
              access_token: accesstoken,
            },
          })
        if (result?.data) {
            req.body.data = result.data
        }
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
    verify
}