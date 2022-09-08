import express, { Router } from "express";
import orderController from '../controllers/orderController'
import authJWT from "../middleware/authJWT";

let router = express.Router();

let orderRoutes = (app) => {

    router.post('/create', [authJWT.verifyToken] ,orderController.handleCreateNewOrder)
    router.get('/get', [authJWT.verifyToken] ,orderController.handleGetOrderHistory)

    return app.use("/api/order", router)
}

module.exports = orderRoutes;