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
            const productStatusUpdated = data.map((p, i) => {
                if (p._id === productId) {
                    p.status = status
                    return p;
                }
                return p;
            });
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
        <div className='tablePageContainer h-full w-full overflow-y-auto px-5'>
            <table className='w-full bg-gray-50 rounded-lg overflow-hidden'>
                <thead className='border-1 h-10 bg-gray-100 border-gray-950'>
                    <tr>
                        <th className='w-[5%] text-center'>S No</th>
                        <th className='w-[12.5%] '>Product Id</th>
                        <th className='w-[40%]'>Order Image</th>
                        <th className='w-[20%] '>Order Details</th>
                        <th className='w-[10%]'>Order Location</th>
                        <th className='w-[12.5%] '>Delivery status</th>
                    </tr>
                </thead>
                <tbody>
                    {productsData.map((product, productIndex) => {
                        return <tr className='py-3 border-b-2' key={product._id}>
                            <td className='w-[5%] text-center'>{productIndex + 1}</td>
                            <td className='w-[12.5%] '>{product._id}</td>
                            <td className='w-[40%] h-[35vh] p-5'><img className='w-full h-full object-cover rounded-md' src={product.image} alt='productImage' /></td>
                            <td className='w-[20%] pl-5'>
                                <p className='my-2'>Product: {product.productName}</p>
                                <p className='my-2'>Price/unit: &#8377;{product.price}</p>
                                <p className='my-2'>Quantity: {product.quantity}</p>
                                <p className='my-2'>Total price: <b>&#8377;{product.quantity * product.price}</b></p>
                            </td>
                            <td className='w-[10%]'>
                                {product.address.doorNo},<br />
                                {product.address.street},<br />
                                {product.address.villageOrCity},<br />
                                {product.address.state},<br />
                                {product.address.pincode}
                            </td>
                            <td className='w-[12.5%]  px-2'>
                                {
                                    loading === product._id ? <Spinner /> :
                                        <select className='w-full outline-none px-2 py-1 shadow-md rounded-md' value={product.status || ""} onChange={(e) => handleUpdateStatus(product._id, e.target.value)}>
                                            <option hidden value="">Change status</option>
                                            <option value="order placed">Order placed</option>
                                            <option value="order shipped">Order shipped</option>
                                            <option value="at nearest store">Order at Nearest store</option>
                                            <option value="out for delivery">Out for delivery</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                }
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Table