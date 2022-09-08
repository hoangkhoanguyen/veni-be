import express, { Router } from "express";
import tokenController from '../controllers/tokenController'
// import authJWT from "../middleware/authJWT";
// import authService from "../services/authService";

let router = express.Router();

let tokenRoutes = (app) => {

    // app.use(function (req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "x-access-token, Origin, Content-Type, Accept"
    //     );
    //     next();
    // });

    router.post('/get-new-token-by-refresh-token', tokenController.handleGetNewTokenByRefreshToken)
    // router.post('/test-verify-google',authService.verifyGoogleToken)

    return app.use("/api/token", router)
}

module.exports = tokenRoutes;