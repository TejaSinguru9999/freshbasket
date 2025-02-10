import { ProductSchema } from "../models/product.js"
import { User } from "../models/user.js"

const AddProduct = async (req, res) => {
    const { image, name, vitamins, carbohydrates, protein, fat, category, quantity, price, address, seller, sellerType } = req.body;
    try {
        const newProduct = await new ProductSchema({
            image,
            productName: name,
            vitamins,
            carbohydrates,
            protein,
            fat,
            category,
            quantity,
            price,
            address,
            seller,
            sellerType
        }).save();
        if (!newProduct) {
            throw new Error("Failed to upload product, please check your uploads once.")
        }
        res.json({
            success: true,
            message: newProduct
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


const getLocalProducts = async (req, res) => {
    const { pincode } = req.params;
    try {
        const localProducts = await ProductSchema.find({ "address.pincode": pincode });
        if (!localProducts) {
            throw new Error("Can't get local products");
        }
        res.json({
            success: true,
            message: localProducts
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

}

const getFreshProducts = async (req, res) => {
    try {
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        const products = await ProductSchema.find({ createdAt: { $gte: oneDayAgo } });
        res.json({
            success: true,
            message: products
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: "Can't get fresh products"
        })
    }
}


const getFarmerProducts = async (req, res) => {
    try {
        const products = await ProductSchema.find({ sellerType: "farmer" });
        res.json({
            success: true,
            message: products
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: "Can't get fresh products"
        })
    }
}

const placeOrder = async (req, res) => {
    try {
        const { orders, buyerId } = req.body
        const sellerProductsMap = {};
        orders.forEach(order => {
            if (!sellerProductsMap[order.seller]) {
                sellerProductsMap[order.seller] = [];
            }
            sellerProductsMap[order.seller].push(order);
        });
        const updatePromises = [];

        // Update sellers' products
        Object.entries(sellerProductsMap).forEach(([sellerId, products]) => {
            updatePromises.push(
                User.findByIdAndUpdate(
                    sellerId,
                    { $push: { products: { $each: products } } },
                    { new: true }
                )
            );
        });

        Object.entries(sellerProductsMap).forEach(([sellerId, products]) => {
            updatePromises.push(
                User.findByIdAndUpdate(
                    buyerId,
                    { $push: { products:  sellerId} },
                    { new: true }
                )
            );
        });
        await Promise.all(updatePromises);

        res.json({
            success: true,
            message: "Order placed"
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Can't place order, try again"
        })
    }
}


const getSellerProducts = async (req, res) => {
    const { sellerId } = req.body;
    try {
        const sellerProducts = await User.findById(sellerId).select("products");
        res.json({
            success: true,
            message: sellerProducts?.products
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "can't get seller products"
        })
    }
}

const updateProductStatus = async (req, res) => {
    const { productId, status, sellerId } = req.body;
    try {
        const product = await User.findOneAndUpdate(
            { _id: sellerId, "products._id": productId },
            { $set: { "products.$.status": status } },
            { new: true }
        );
        if (!product) {
            throw new Error("No product found");
        }
        res.json({
            success: true,
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Failed to update status" || error.message,
        })
    }
}

const getMyOrders=async(req,res)=>{
    const {buyerId}=req.body;
    try {
        const buyerProducts = await User.findById(buyerId).select("products");
        const orderPromises = buyerProducts.products.map((sellerId) =>
            User.findOne({ _id: sellerId}).select("products")
        );
        const orders = await Promise.all(orderPromises);
        let finalOrders = []
        const mapOnSellers = orders.map((seller,index)=>{
            const filteredProducts = seller.products.filter(product=>product.buyer===buyerId);
            finalOrders.push(...filteredProducts)
        })
        // const filteredProducts = orders.products.filter(product => product.buyer.toString() === buyerId);
        res.json({
            success:true,
            message:finalOrders
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

const deleteAnAttribute = async () => {
    await ProductSchema.updateMany({}, { $unset: { status: 1 } });
}
// deleteAnAttribute()


export {
    AddProduct, getLocalProducts, getFreshProducts, getFarmerProducts, updateProductStatus,
    placeOrder, getSellerProducts, getMyOrders
}