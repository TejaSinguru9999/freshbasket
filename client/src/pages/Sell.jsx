import React, { useState } from 'react'
import Spinner from "../components/Spinner"
function Sell() {
    const [imageUrl, setImageUrl] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    };
    const setCategory = (e) => {
    }
    return (
        <div className='w-full flex h-[88vh] p-2'>
            <div className='imageContainer w-1/2 h-full p-5'>
                <form>
                    <input type='file' placeholder='Upload an image' required accept='image/*' onChange={handleImageChange} />
                </form>
                {imageUrl && <img src={imageUrl} alt="Uploaded preview" className='w-full max-h-[50vh] mt-2 rounded-sm boxShadow' />}
                <Spinner/>
            </div>
            <div className='w-1/2 h-full flex flex-col p-2'>
                <form className='w-full h-full flex flex-wrap py-10'>
                    <div className='w-1/2 h-[90%] p-2 justify-around flex flex-col'>
                        <input className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Food item name' required />
                        <input className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Vitamis ("," separated)' required />
                        <input className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Carbohydrates' required />
                        <input className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Proteins' required />
                        <input className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Fats' required />
                        <select onChange={setCategory} className='outline-none border-gray-500 border-2'>
                            <option hidden>Select category</option>
                            <option>Vegetables</option>
                            <option>Fruits</option>
                            <option>Whole Grains</option>
                            <option>Pulses</option>
                            <option>Legumes</option>
                            <option>Herbs</option>
                            <option>Nuts and Seeds</option>
                        </select>
                        <input className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Total price' required />
                    </div>
                    <div className='w-1/2 h-[90%] p-2 justify-around flex flex-col'>
                        <p className='font-semibold'>Selling location</p>
                        <input className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Door No' required />
                        <input className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Street name' required />
                        <input className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Village/city' required />
                        <input className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='District' required />
                        <input className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='State' required />
                        <input className='px-3 py-1 rounded-md outline-none border-gray-500 border-2' type='text' placeholder='Pincode' required />
                    </div>
                    <div className='h-[10%] w-full text-center'>
                        <button className='bg-green-500 text-white px-5 py-2 rounded-md'>Sell</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Sell