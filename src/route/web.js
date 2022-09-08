// const productRoutes = require("../route/product");
import productRoutes from './product'
import userRoutes from './user'
import tokenRoutes from './token'
import orderRoutes from './order'

const initWebRoutes = (app) => {
    productRoutes(app)
    userRoutes(app)
    tokenRoutes(app)
    orderRoutes(app)
}

module.exports = initWebRoutes;