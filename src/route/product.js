import express from "express";
import productController from '../controllers/productController'
import authGoogleService from "../middleware/authGoogleService";
import authJWT from "../middleware/authJWT";

let router = express.Router();

let productRoutes = (app) => {
    router.get('/get', productController.handleGet)
    router.get('/get-product-from-my-store',[authJWT.verifyToken], productController.handleGetProductFromMyStore)
    router.get('/get-products-by-id-list', productController.handleGetProductByIdList)
    router.post('/add-product-info', [authJWT.verifyToken], productController.handleAddProductInfo)
    router.post('/add-quantity-to-inventory',[authJWT.verifyToken], productController.handleAddQuantityToInventory)
    router.post('/update-product-info',[authJWT.verifyToken], productController.handleUpdateProductInfo)
    router.post('/delete-product',[authJWT.verifyToken], productController.handleDeleteProduct)
    router.get('/search', productController.handleSearchProducts)

    return app.use("/api/product", router)
}

module.exports = productRoutes;