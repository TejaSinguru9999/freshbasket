import React from 'react'

function Table() {
    return (
        <div className='tablePageContainer h-full w-full overflow-y-auto p-5'>
            <table className='w-full bg-gray-50 rounded-lg overflow-hidden'>
                <thead className='border-1 h-10 bg-gray-100 border-gray-950'>
                    <tr>
                        <th className='w-[5%] text-center'>S No</th>
                        <th className='w-[12.5%] '>Order Id</th>
                        <th className='w-[40%]'>Order Image</th>
                        <th className='w-[20%] '>Order Details</th>
                        <th className='w-[10%]'>Order Location</th>
                        <th className='w-[12.5%] '>Delivery status</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 5 }).map((product, productIndex) => {
                        return <tr className='py-3 border-b'>
                            <td className='w-[5%] text-center'>{productIndex + 1}</td>
                            <td className='w-[12.5%] '>esfre5e5t5brse4</td>
                            <td className='w-[40%] h-[25vh]'><img className='w-auto h-full mx-auto' src='/assets/homeBasket.png' alt='basket' /></td>
                            <td className='w-[20%] '>
                                Vegetable Salad<br/>
                                Vitamins:A,K,C<br/>
                                Carbohydrates: 80 cal<br/>
                                Protien: 5 gms<br/>
                                Fat: 2 gms<br/>
                            </td>
                            <td className='w-[10%]'>
                                3-129/2<br/>
                                Beach street<br/>
                                Vizag<br/>
                                A.P<br/>
                                533-935
                            </td>
                            <td className='w-[12.5%]  px-2'>
                                <select className='w-full outline-none px-2 py-1 rounded-sm'>
                                    <option>Order placed</option>
                                    <option>Order shipped</option>
                                    <option>Order at Nearest store</option>
                                    <option>Out for delivery</option>
                                    <option>Delivered</option>
                                    <option>Cancelled</option>
                                    <option>Replaced</option>
                                    <option>Refunded</option>
                                </select>
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Table