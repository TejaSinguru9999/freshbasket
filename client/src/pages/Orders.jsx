import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../context/Contextapi"
import Spinner from "../components/Spinner"
function Orders() {
  const { user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false)
  const [myOrders, setMyOrders] = useState([])
  const getMyOrders = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("https://freshbasket-server.vercel.app/api/v1/products/getMyOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ buyerId: user._id })
      })
      const jsonResponse = await response.json();
      if (!jsonResponse.success) {
        throw new Error(jsonResponse.message)
      }
      setMyOrders(jsonResponse.message)
    } catch (error) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getMyOrders();
  }, [])

  return (<> {isLoading ? <Spinner/> :
    <>
      {myOrders.length === 0 ? <p className='text-center text-xl font-semibold mt-[10vh]'>No purchases yet</p> : <div className='p-4'>
        <div className='flex justify-between items-center px-4'>
        <h2 className='text-2xl font-semibold'>Your Orders</h2>
        <button className='p-2 bg-green-400 hover:bg-green-500 rounded-md text-white' onClick={getMyOrders}>Refresh orders</button>
        </div>
        {myOrders.map((product, index) => {
          return <div key={index} className='flex items-center bg-slate-100 p-4 rounded-lg my-4'>
            <img src={product.image} alt={product.productName} className='w-40 h-40 rounded-lg' />
            <div className='flex flex-col justify-center px-4 gap-2 w-[20vw]'>
              <p className='font-semibold text-xl'>{product.productName}</p>
              <p>Quantity: <b>{product.quantity}</b></p>
              <p>Total price: <b>&#8377;{product.price * product.quantity}</b></p>
            </div>
            <div className='flex items-center w-full'>
              {["order placed", "order shipped", "at nearest store", "out for delivery", "delivered"].map((status,index)=><div className='flex flex-col gap-2 w-[20%]' key={index}>
              <img src={`/assets/${status}.svg`} alt={status} className={`${status===product.status ? "w-16 h-16 bg-green-200 rounded-full p-2" : "w-8 h-8"} mx-auto`}/>
                {status===product.status &&<p className='text-center font-bold text-green-700'>{status.toUpperCase()}</p>}
              </div>
                )}
            </div>
          </div>
        })}
      </div>}
    </>
}
  </>
  )
}

export default Orders