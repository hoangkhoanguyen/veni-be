import express, { Router } from "express";
import userController from '../controllers/userController'
import authJWT from "../middleware/authJWT";
import authGoogleService from '../middleware/authGoogleService'
import authFaceBook from '../middleware/authFacebookService'

let router = express.Router();

let userRoutes = (app) => {

    // app.use(function (req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "x-access-token, Origin, Content-Type, Accept"
    //     );
    //     next();
    // });

    router.post('/login', userController.handleLogin)
    router.post('/link-to-google-account', [authJWT.verifyToken], [authGoogleService.verify], userController.handleLinkToGoogleAccount)
    router.post('/log-in-with-google', [authGoogleService.verify], userController.handleLoginWithGoogle)
    router.post('/log-in-with-facebook', [authFaceBook.verify], userController.handleLoginWithFacebook)
    router.post('/check-auth', [authJWT.checkTokenWhenStart], userController.handleCheckAuth)
    router.post('/update-info', [authJWT.verifyToken], userController.handleUpdateInfo)
    router.post('/link-to-facebook-account', [authJWT.verifyToken], [authFaceBook.verify], userController.handleLinkToFacebookAccount)
    router.post('/send-message-to-admin', userController.handleSendMessageToAdmin)

    // router.get('/getAll', [authJWT.verifyToken], userController.handleGetAllUsers)
    router.post('/addNew', userController.handleAddNewUser)
    // router.post('/edit', [authJWT.verifyToken, authJWT.isAdmin], userController.handleEditUser)
    // router.post('/delete', [authJWT.verifyToken, authJWT.isAdmin], userController.handleDeleteUser)

    return app.use("/api/user", router)
}

module.exports = userRoutes;