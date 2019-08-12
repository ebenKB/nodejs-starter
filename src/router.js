import express from 'express';
import UserRoute from './routes/user';
import ProductRoute from './routes/product';

const apiRouter = express.Router();

// initialize the user routes
const userRoute = new UserRoute(apiRouter);
const productRoute = new ProductRoute(apiRouter);
userRoute.UserRoutes(apiRouter);
productRoute.ProductRoutes(apiRouter);


export default apiRouter;
