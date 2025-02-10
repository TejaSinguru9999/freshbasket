import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Contextapi";
import Spinner from "../components/Spinner"
import {useNavigate} from "react-router-dom"
const Cart = () => {
    const { cart, setCart, user } = useContext(Context)
    const navigate = useNavigate();
    const [loading, setLoading]=useState(false)
    const [totals, setTotals]=useState({
        items:0,
        subtotal:0,
        total:0
    });
    useEffect(()=>{
        let items=0;
        let subtotal=0;
        cart.map((item,index)=>{
            items = items + item.quantity;
            subtotal = subtotal + (item.quantity*item.price);
        })
        setTotals({
            items, subtotal
        })
    },[cart])

    const increaseQuantity=(product)=>{
        const newCart = cart.map(cartItem => cartItem._id === product._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
        setCart(newCart)
    }

    const decreaseQuantity=(product)=>{
        let newCart = [];
        if(product.quantity===1){
            newCart = cart.filter((cartItem, index)=>cartItem._id!==product._id);
        }else{
            newCart = cart.map(cartItem => cartItem._id === product._id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
        }
        setCart(newCart)
    }

    const removeItem=(product)=>{
        const newCart = cart.filter((cartItem, index)=>cartItem._id!==product._id);
        setCart(newCart)
    }

    const handlePlaceOrder=async()=>{
        const newOrder = cart.map((cartItem, index)=>{
            return {
                _id: cartItem._id,
                productName: cartItem.productName,
                image:cartItem.image,
                buyer:user._id,
                seller:cartItem.seller,
                sellerType:cartItem.sellerType,
                price:cartItem.price,
                quantity:cartItem.quantity,
                address: {
                    doorNo: user.doorNo,
                    street:user.street,
                    villageOrCity:user.villageOrCity,
                    district:user.district,
                    state:user.state,
                    pincode:user.pincode
                },
                status:"order placed"
            }
        })
        try {
            setLoading(true)
            const response = await fetch("http://localhost:8080/api/v1/products/placeOrder",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({orders:newOrder, buyerId:user._id})
            })
            const jsonResponse = await response.json();
            if(!jsonResponse.success){
                throw new Error(jsonResponse.message)
            }
            setCart([])
            navigate("/myorders")
        } catch (error) {
            alert(error.message)
        } finally{
            setLoading(false)
        }
        
    }

    return <div className="p-5">
        <h2 className="text-3xl font-semibold ml-4">Your cart</h2>
        {cart?.length === 0 ? <h2 className="text-center mt-[10vh] font-bold text-3xl">Looks like you haven't added any product yet.</h2>
            : <div className="flex mt-4 relative">
                <div className="flex flex-col w-3/4">
                    {cart.map((item, index) => <div className="w-full bg-slate-100 mb-4 p-4 rounded-lg flex gap-4 mx-auto" key={item._id}>
                        <div className="w-56 h-56"><img src={item.image} alt={item.productName} className="object-cover w-full h-full rounded-md" /></div>
                        <div className="ml-4 w-1/2">
                            <h2 className="text-3xl font-bold text-green-700">{item.productName}</h2>
                            <div className='vitaminsContainer flex mt-10'>
                                <p>Vitamins: </p>
                                {item.vitamins.split(",").map((vitamin, vIndex) => <p key={vIndex} className='mx-1 px-1 rounded-sm bg-green-400 text-white'>{vitamin}</p>)}
                            </div>
                            <p className='my-2'>Carbohydrates: {item.carbohydrates} cal</p>
                            <p className='my-2'>Protien: {item.protein} gms</p>
                            <p className='my-2'>Fat: {item.fat} gms</p>
                        </div>
                        <div className="flex flex-col justify-center gap-6">
                            <div className="flex items-center">
                                <p>Quantity: </p>
                                <div className="flex items-center justify-between gap-2 px-2">
                                    <img src="/assets/minus.svg" alt="minus" className="w-8 h-8 object-cover cursor-pointer" onClick={()=>decreaseQuantity(item)}/>
                                    <p className="text-xl">{item.quantity}</p>
                                    <img src="/assets/plus.svg" alt="plus" className="w-8 h-8 object-cover cursor-pointer" onClick={()=>increaseQuantity(item)}/>
                                </div>
                            </div>
                            <div className="flex">
                                <p>Price: </p>
                                <p className="ml-2 font-semibold">&#8377;{item.quantity * item.price}</p>
                            </div>
                            <div className="flex items-center  bg-[#E52020] hover:bg-[#C53030] justify-center py-1 rounded-lg cursor-pointer" onClick={()=>removeItem(item)}>
                                <p className="text-lg text-white">Remove</p>
                                <img src="/assets/delete.svg" alt="plus" className="w-6 h-6 object-cover cursor-pointer ml-4" onClick={()=>increaseQuantity(item)}/>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <div className="totalsContainer w-[23%] flex flex-col gap-4 items-center border-2 fixed right-5 rounded-md bg-slate-200 px-8 py-3">
                    <h2 className="font-bold text-2xl mb-2">Order summary</h2>
                    <div className="flex justify-between w-full">
                        <p>Total items</p>
                        <p>{totals.items}</p>
                    </div>
                    <div className="flex justify-between w-full">
                        <p>Sub total</p>
                        <p>&#8377;{totals.subtotal}</p>
                    </div>
                    <div className="flex justify-between w-full">
                        <p>Delivery</p>
                        <p>&#8377;49</p>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between w-full">
                        <p className="font-semibold text-xl">Total</p>
                        <p className="font-semibold text-xl">&#8377;{totals.subtotal+49}</p>
                    </div>
                    {
                        loading ? <Spinner/> : <button className="bg-green-700 text-white px-4 py-2 rounded-full" onClick={handlePlaceOrder}>Place order</button>
                    }
                    
                </div>
            </div>
        }
    </div>
}

export default Cart;