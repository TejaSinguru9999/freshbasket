import React, { useContext, useEffect, useState } from 'react'
import Spinner from './Spinner';
import { Context } from '../context/Contextapi';

function Product({ title }) {
    const { user, cart, setCart } = useContext(Context)
    const [gettingProducts, setGettingProducts] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            setGettingProducts(true);
            let url = "";

            if (title?.toLowerCase().trim() === "local") {
                url = `https://freshbasket-server.vercel.app/api/v1/products/local/${user?.pincode}`
            } else if (title?.toLowerCase().trim() === "fresh") {
                url = `https://freshbasket-server.vercel.app/api/v1/products/fresh`
            } else {
                url = `https://freshbasket-server.vercel.app/api/v1/products/farmer`
            }

            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const jsonResponse = await response.json();

            if (!jsonResponse.success) throw new Error(jsonResponse.message);
            setProducts(jsonResponse.message);
        } catch (error) {
            alert(error.message);
        } finally {
            setGettingProducts(false);
        }
    };

    useEffect(() => { fetchProducts(); }, [title]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item._id === product._id);
        if (existingProduct) {
            const updatedCart = cart.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart(prev => [...prev, { ...product, quantity: 1 }]);
        }
    };

    return (
        <>
            {gettingProducts ? (
                <Spinner />
            ) : (
                <>
                    {products.length === 0 ? (
                        <div className="mt-[25vh] text-center text-xl p-4">
                            {title === "Fresh" && <>No product was updated in last 24 hours.<br />Please visit again later.</>}
                            {title === "Local" && <>No product from your area (pincode: {user.pincode}).<br />Please visit again later.</>}
                            {title === "Farmers" && <>No product from farmers.<br />Please visit again later.</>}
                        </div>
                    ) : (
                        <div className="w-full p-4">
                            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6">
                                {title === "Fresh" && <>Find the <span className="text-green-500 font-bold text-4xl">Fresh</span> items uploaded in the last <span className="text-green-500 font-bold text-4xl">24 hours</span></>}
                                {title === "Local" && <>Find the <span className="text-green-500 font-bold text-4xl">Local</span> food items around you</>}
                                {title === "Farmers" && <>Searching for organic food?<br /><span className="text-green-500 font-bold text-4xl">Get 100% natural food from Farmers</span></>}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg shadow-md border bg-white overflow-hidden"
                                    >
                                        <div className="h-48 sm:h-60 md:h-64 overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.productName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="p-4 flex flex-col justify-between h-full">
                                            <h3 className="text-green-700 text-xl font-bold mb-2">{product.productName?.toUpperCase()}</h3>

                                            <div className="flex flex-wrap gap-2 text-sm my-2">
                                                <span className="font-medium">Vitamins:</span>
                                                {product.vitamins.split(",").map((vitamin, vIndex) => (
                                                    <span
                                                        key={vIndex}
                                                        className="bg-green-400 text-white px-2 py-0.5 rounded-full"
                                                    >
                                                        {vitamin}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="text-sm my-1">Carbs: {product.carbohydrates} cal</p>
                                            <p className="text-sm my-1">Protein: {product.protein} g</p>
                                            <p className="text-sm my-1">Fat: {product.fat} g</p>

                                            <div className="mt-4 flex justify-between items-center">
                                                <p className="font-bold text-lg">
                                                    ₹{product.price}/{product.quantity}
                                                </p>
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-sm px-4 py-2 rounded-full"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Product;
