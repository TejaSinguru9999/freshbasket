import React from 'react'

function Products({ title, data }) {
    console.log(data[0])
    return (
        <div className='productsPageContainer w-full p-2'>
                {title==="Fresh"&& <h2 className='text-center text-3xl font-semibold'>Find the <span className='text-green-500 text-5xl font-bold'>{title}</span> food items here...</h2>}
                {title==="Local"&& <h2 className='text-center text-3xl font-semibold'>Find the <span className='text-green-500 text-5xl font-bold'>{title}</span> food items around you...</h2>}
                {title==="Farmers"&& <h2 className='text-center text-3xl font-semibold'>Searching for organic food?<br/><span className='text-green-500 text-5xl font-bold'>Get 100% natural food from {title}</span></h2>}
            <div className='productsContainer p-2 pt-5 w-full'>
                {data.map((product, index) => {
                    return <div className='productContainer h-[27.5rem] overflow-hidden rounded-md shadow-md' key={index}>
                        <div className='productImgContainer overflow-hidden h-[70%]'>
                            <img className='w-full h-full' src={product.imageUrl} alt={product.imageUrl} />
                        </div>
                        <div className='detailsContainer p-1 px-3'>
                            <h3>{product.name}</h3>
                            <div className='vitaminsContainer flex'>
                                <p>Vitamins: </p>
                                {product.nutritions.vitamins.map((vitamin, vIndex) => <p key={vIndex}>{vitamin}</p>)}
                            </div>
                            <p>Carbohydrates: {product.nutritions.carbohydratesInCal} cal</p>
                            <p>Protien: {product.nutritions.protienInGrams} gms</p>
                            <p>Fat: {product.nutritions.fatsGrams} gms</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Products