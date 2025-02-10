import Router from "express";
import { AddProduct, getLocalProducts, getFreshProducts, getFarmerProducts, updateProductStatus,
    placeOrder, getSellerProducts, getMyOrders
 } from "../controllers/product.js";

const ProductRouter = Router();

ProductRouter.route("/add").post(AddProduct)
ProductRouter.route("/local/:pincode").get(getLocalProducts)
ProductRouter.route("/fresh").get(getFreshProducts)
ProductRouter.route("/farmer").get(getFarmerProducts)
ProductRouter.route("/placeOrder").post(placeOrder)
ProductRouter.route("/getSellerProducts").post(getSellerProducts)
ProductRouter.route("/getMyOrders").post(getMyOrders)
ProductRouter.route("/updateStatus").post(updateProductStatus)

export default ProductRouter