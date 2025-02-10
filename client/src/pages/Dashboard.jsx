import React, { useContext, useEffect, useState } from 'react'
import Table from '../components/Table'
import { Context } from '../context/Contextapi'
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const { user } = useContext(Context);
  const [products, setProducts] = useState(user.products);
  const [isLoading, setIsLoading] = useState(false)

  const getSellerProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:8080/api/v1/products/getSellerProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sellerId: user._id })
      })
      const jsonResponse = await response.json();
      if (!jsonResponse.success) {
        throw new Error(jsonResponse.message)
      }
      setProducts(jsonResponse.message)
    } catch (error) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSellerProducts();
  }, [])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>{products.length === 0 ? <>
      <h2 className='text-center mt-[10vh] font-semibold text-xl'>No orders yet, sell more to get more orders</h2>
      <button className='p-2 bg-green-400 hover:bg-green-500 rounded-md text-white block mx-auto my-8' onClick={getSellerProducts}>Refresh orders</button>
    </> :
      <>
        <div className='flex justify-between items-center p-4'>
          <h2 className='text-2xl font-semibold'>Your Orders</h2>
          <button className='p-2 bg-green-400 hover:bg-green-500 rounded-md text-white' onClick={getSellerProducts}>Refresh orders</button>
        </div>
        <Table data={products} seller={user} />
      </>
    }</>
  )
}

export default Dashboard;