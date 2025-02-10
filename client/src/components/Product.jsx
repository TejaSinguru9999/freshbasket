import React, { useContext, useEffect, useState } from 'react'
import Spinner from './Spinner';
import { Context } from '../context/Contextapi';

function Product({ title }) {
    const { user, cart, setCart, dummyProducts } = useContext(Context)
    const [gettingProducts, setGettingProducts] = useState(false);
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            setGettingProducts(true);
            let url = "";
            if (title?.toLowerCase().trim() === "local") {
                url = `http://localhost:8080/api/v1/products/local/${user?.pincode}`
            } else if (title?.toLowerCase().trim() === "fresh") {
                url = `http://localhost:8080/api/v1/products/fresh`
            } else {
                url = `http://localhost:8080/api/v1/products/farmer`
            }
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const jsonResponse = await response.json();
            if (!jsonResponse.success) {
                throw new Error(jsonResponse.message)
            }
            console.log(jsonResponse.message)
            setProducts(jsonResponse.message)
        } catch (error) {
            alert(error.message)
        } finally {
            setGettingProducts(false)
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [title])

    const addToCart=(product)=>{
        const existingProduct = cart.find(cartItem => cartItem._id===product._id)
        if(existingProduct){
            const newCart = cart.map(cartItem => cartItem._id === product._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
            setCart(newCart)
        }else{
            setCart(prev=>[...prev, {...product, quantity:1}])
        }
    }
    return (<>
        {
            gettingProducts ?
                <Spinner /> :
                <>{products.length === 0 ? <>
                    {title === "Fresh" && <p className='mt-[25vh] text-center text-xl'>No product was updated in last 24 hours. <br />Please visit again later.</p>}
                    {title === "Local" && <p className='mt-[25vh] text-center text-xl'>No product was updated from your area pincode: {user.pincode}. <br />Please visit again later.</p>}
                    {title === "Farmers" && <p className='mt-[25vh] text-center text-xl'>No product was updated from farmers. <br />Please visit again later.</p>}
                </>
                    :
                    <div className='productsPageContainer w-full p-2'>
                        {title === "Fresh" && <h2 className='text-center text-3xl font-semibold'>Find the <span className='text-green-500 text-5xl font-bold'>{title}</span> food items uploaded in last <span className='text-green-500 text-5xl font-bold'>24 hours</span></h2>}
                        {title === "Local" && <h2 className='text-center text-3xl font-semibold'>Find the <span className='text-green-500 text-5xl font-bold'>{title}</span> food items around you...</h2>}
                        {title === "Farmers" && <h2 className='text-center text-3xl font-semibold'>Searching for organic food?<br /><span className='text-green-500 text-5xl font-bold'>Get 100% natural food from {title}</span></h2>}
                        <div className='productsContainer p-2 pt-5 w-full'>
                            {products.map((product, index) => {
                                return <div className='productContainer h-[28rem] overflow-hidden rounded-lg' key={index}>
                                    <div className='productImgContainer overflow-hidden h-[60%]'>
                                        <img className='w-full h-full object-cover' src={product.image} alt={product.image} />
                                    </div>
                                    <div className='flex'>
                                        <div className='detailsContainer p-1 px-5 w-[60%]'>
                                            <h3 className='text-green-700 text-xl my-2 font-bold'>{product.productName?.toUpperCase()}</h3>
                                            <div className='vitaminsContainer flex my-2'>
                                                <p>Vitamins: </p>
                                                {product.vitamins.split(",").map((vitamin, vIndex) => <p key={vIndex} className='mx-1 px-1 rounded-sm bg-green-400 text-white'>{vitamin}</p>)}
                                            </div>
                                            <p className='my-2'>Carbohydrates: {product.carbohydrates} cal</p>
                                            <p className='my-2'>Protien: {product.protein} gms</p>
                                            <p className='my-2'>Fat: {product.fat} gms</p>
                                        </div>
                                        <div className='w-[40%] flex flex-col justify-center items-center gap-4'>
                                            <p className='font-bold text-xl'>&#8377;{product.price}/{product.quantity}</p>
                                            <button className='productBtn px-2 py-1 bg-green-500 w-[75%] rounded-full text-white hover:bg-green-600 active:bg-green-700' onClick={()=>addToCart(product)}>Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                }
                </>
        }
    </>)
}

export default Product