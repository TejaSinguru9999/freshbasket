import React, { useContext, useState } from 'react'
import Spinner from "../components/Spinner"
import imageToBase from "../helpers/imageToBase"
import { Context } from '../context/Contextapi';
function Sell() {
    const {user}=useContext(Context);
    const [loading, setLoading] = useState(false);
    const productSchema = {
        image: "",
        name: "",
        vitamins: "",
        carbohydrates:"",
        protein: "",
        fat: "",
        category: "",
        quantity:"",
        price: "",
    }
    const [product, setProduct] = useState(productSchema);

    const productAddressSchema = {
        doorNo: user?.doorNo,
        street: user?.street,
        villageOrCity: user?.villageOrCity,
        district: user?.district,
        state: user?.state,
        pincode: user?.pincode
    }
    const [productAddress, setProductAddress] = useState(productAddressSchema)

    const handleProductInfoChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev, [name]: value,
        }))
    }
    const handleProductAddressChange = (e) => {
        const { name, value } = e.target;
        setProductAddress(prev => ({
            ...prev, [name]: value,
        }))
    }

    const handleImageChange = async (e) => {
        const image = e.target.files[0];
        if (image) {
            const base64Img = await imageToBase(image);
            setProduct(prev=>({...prev, image:base64Img}));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response =await fetch("https://freshbasket-server.vercel.app/api/v1/products/add",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({...product, address:productAddress, seller:user?._id, sellerType:user?.role})
            });
            const jsonResponse = await response.json();
            if(!jsonResponse.success){
                throw new Error(jsonResponse.message);
            }
            setProduct(productSchema);
            setProductAddress(productAddressSchema)
            alert("Product uploaded successfully")
        } catch (error) {
            alert(error.message)
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className='w-full flex h-[88vh] p-2'>
            <form className='w-full h-full flex py-10' onSubmit={handleSubmit}>
                <div className='imageContainer w-1/2 h-full p-5'>
                    <input onChange={handleImageChange} type='file' placeholder='Upload an image' required accept='image/*'/>
                    {product.image && <img src={product.image} alt="Uploaded preview" className='w-full max-h-[50vh] mt-2 rounded-sm boxShadow' />}
                </div>
                <div className='w-1/2 h-full flex flex-wrap p-2'>
                    <div className='w-1/2 h-[90%] p-2 justify-around flex flex-col'>
                        <input name='name' value={product.name} onChange={handleProductInfoChange} className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Food item name' required />
                        <input name='vitamins' value={product.vitamins} onChange={handleProductInfoChange} className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Vitamis ("," separated)' required />
                        <input name='carbohydrates' value={product.carbohydrates} onChange={handleProductInfoChange} className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Carbohydrates' required />
                        <input name='protein' value={product.protein} onChange={handleProductInfoChange} className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Proteins' required />
                        <input name='fat' value={product.fat} onChange={handleProductInfoChange} className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Fats' required />
                        <select name='category' value={product.category} onChange={handleProductInfoChange} className='outline-none border-gray-500 border-2'>
                            <option hidden>Select category</option>
                            <option>Vegetables</option>
                            <option>Fruits</option>
                            <option>Green leafs</option>
                            <option>Whole Grains</option>
                            <option>Pulses</option>
                            <option>Legumes</option>
                            <option>Herbs</option>
                            <option>Nuts and Seeds</option>
                            <option>Mixed Vegetables with Fruits</option>
                            <option>Snacks</option>
                            <option>Diet</option>
                            <option>All mix</option>
                        </select>
                        <input name='quantity' value={product.quantity} onChange={handleProductInfoChange} className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Enter quantity. Eg: 1kg, 2units, 500grams etc...' required />
                        <input name='price' value={product.price} onChange={handleProductInfoChange} className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Total price' required />
                    </div>
                    <div className='w-1/2 h-[90%] p-2 justify-around flex flex-col'>
                        <p className='font-semibold'>Selling location</p>
                        <input name='doorNo' value={productAddress.doorNo} onChange={handleProductAddressChange} className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Door No' required />
                        <input name='street' value={productAddress.street} onChange={handleProductAddressChange} className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Street name' required />
                        <input name='villageOrCity' value={productAddress.villageOrCity} onChange={handleProductAddressChange} className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Village/city' required />
                        <input name='district' value={productAddress.district} onChange={handleProductAddressChange} className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='District' required />
                        <input name='state' value={productAddress.state} onChange={handleProductAddressChange} className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='State' required />
                        <input name='pincode' value={productAddress.pincode} onChange={handleProductAddressChange} className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Pincode' required />
                    </div>
                    <div className='h-[10%] w-full text-center'>
                        {loading ? <Spinner/> : <button className='bg-green-500 text-white px-5 py-2 rounded-md'>Sell</button>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Sell