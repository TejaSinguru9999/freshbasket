import React from 'react'

function Hero() {
  return <div className='w-full h-[88vh] flex'>
    <div className='textContainer w-[50%] h-full flex items-center justify-center flex-col px-4 bg-[#0f0f0f]'>
      <h2 className='text-7xl font-bold text-green-700'>SAVE THE WORLD</h2>
      <p className='text-4xl my-5 text-white'>Plant Trees In Your Surroundings...</p>
      <a href='#learn' className='bg-white p-2 rounded-md'>Learn More...</a>
    </div>
    <div className='imgContainer w-[50%] bg-[#0f0f0f]'>
      <img className='heroImage w-full h-full' src='/public/assets/hero.jpg' alt='hero image' />
    </div>
  </div>
}


function Home() {
  return (
    <div className='w-full'>
      <Hero />
      <div id='learn' className='w-full p-5'>
        <h2 className='text-center text-3xl mb-4'>what is <span className='text-green-700 font-semibold'>FreshBasket</span> ?</h2>
        <p class="text-xl text-gray-600 text-center mb-4">
          Welcome to <span class="text-green-700">FreshBasket</span>, your go-to platform for buying and selling <span class="text-green-700">fresh</span> and sustainable food directly from local farmers and communities.
        </p>
        <div class="offerContainer p-6 bg-green-800 text-white rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold text-center mb-4">What We Offer ?</h2>
          <p class="my-7 text-xl">&#183; Fresh, locally sourced produce directly from farmers and community sellers.</p>
          <p class="my-7 text-xl">&#183; Eco-friendly approach with reduced food waste and sustainable farming practices.</p>
          <p class="my-7 text-xl">&#183; Support for local farmers and individuals, fostering a community of fresh food suppliers.</p>
          <p class="my-7 text-xl">&#183; A simple and convenient platform to buy and sell fresh food from your neighborhood.</p>
          <p class="my-7 text-xl">&#183; Seasonal produce, ensuring you get the freshest items available in your area.</p>
          <p class="my-7 text-xl">&#183; Zero packaging waste, encouraging sustainable food consumption habits.</p>
          <p class="my-7 text-xl">&#183; Affordable options for everyone, helping make fresh, healthy food accessible to all.</p>
        </div>
      </div>
    </div>
  )
}

export default Home