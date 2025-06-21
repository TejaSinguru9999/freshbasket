import React, { useState } from 'react'
import Spinner from '../components/Spinner';

function Table({ data, seller }) {
    const [productsData, setProductsData] = useState(data)
    const [loading, setLoading] = useState(false)

    const handleUpdateStatus = async (productId, status) => {
        try {
            setLoading(productId)
            const response = await fetch("https://freshbasket-server.vercel.app/api/v1/products/updateStatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId, status, sellerId: seller._id })
            })
            const jsonResponse = await response.json();
            if (!jsonResponse.success) {
                throw new Error(jsonResponse.message);
            }
            const productStatusUpdated = data.map((p) =>
                p._id === productId ? { ...p, status } : p
            );
            setProductsData(productStatusUpdated)
            const updatedUserData = { ...seller, products: productStatusUpdated };
            localStorage.setItem("user", JSON.stringify(updatedUserData))
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full px-2 md:px-5 overflow-x-auto">
            <table className="min-w-[900px] w-full bg-gray-50 rounded-lg shadow-sm border-collapse">
                <thead className="bg-gray-100 text-gray-700 text-sm">
                    <tr>
                        <th className="text-center px-2 py-2">S No</th>
                        <th className="text-left px-2 py-2">Product ID</th>
                        <th className="text-left px-2 py-2">Order Image</th>
                        <th className="text-left px-2 py-2">Order Details</th>
                        <th className="text-left px-2 py-2">Order Location</th>
                        <th className="text-left px-2 py-2">Delivery Status</th>
                    </tr>
                </thead>
                <tbody>
                    {productsData.map((product, productIndex) => (
                        <tr key={product._id} className="border-t border-gray-300">
                            <td className="text-center px-2 py-4">{productIndex + 1}</td>
                            <td className="px-2 py-4 break-words max-w-[150px]">{product._id}</td>
                            <td className="px-2 py-4">
                                <img
                                    src={product.image}
                                    alt="product"
                                    className="w-full max-w-[250px] h-40 object-cover rounded-md"
                                />
                            </td>
                            <td className="px-2 py-4 text-sm">
                                <p className="mb-1">Product: {product.productName}</p>
                                <p className="mb-1">Price/unit: ₹{product.price}</p>
                                <p className="mb-1">Quantity: {product.quantity}</p>
                                <p className="mb-1 font-semibold">
                                    Total: ₹{product.quantity * product.price}
                                </p>
                            </td>
                            <td className="px-2 py-4 text-sm whitespace-pre-line">
                                {product.address.doorNo}, {product.address.street},<br />
                                {product.address.villageOrCity}, {product.address.state},<br />
                                {product.address.pincode}
                            </td>
                            <td className="px-2 py-4">
                                {loading === product._id ? (
                                    <Spinner />
                                ) : (
                                    <select
                                        className="w-full outline-none px-2 py-1 shadow-md rounded-md text-sm"
                                        value={product.status || ""}
                                        onChange={(e) => handleUpdateStatus(product._id, e.target.value)}
                                    >
                                        <option hidden value="">Change status</option>
                                        <option value="order placed">Order placed</option>
                                        <option value="order shipped">Order shipped</option>
                                        <option value="at nearest store">Order at Nearest store</option>
                                        <option value="out for delivery">Out for delivery</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
