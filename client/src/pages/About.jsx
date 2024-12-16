import React from 'react'

function About() {
    return (
        <div className='w-full overflow-y-auto p-5'>
            <h1 className='text-center text-xl font-bold text-green-700'>FreshBasket: Fresh, Affordable, and Locally Sourced Greens for Urban Communities</h1>
            <section className='px-4 py-2 bg-slate-100 rounded-lg my-5'>
                <h2 className='text-2xl font-serif font-semibold text-green-500'>Project Overview</h2>
                <p>
                    The <span className='text-green-700 font-bold'>FreshBasket</span> platform is designed to provide fresh, affordable, and locally sourced greens to urban and underserved communities.
                    This initiative aims to minimize food waste, support local farmers, and encourage healthy eating habits among urban populations.
                </p>
            </section>

            <section className='px-4 py-2 bg-slate-100 rounded-lg my-5'>
                <h2 className='text-2xl font-serif font-semibold text-green-500'>Domains included</h2>
                <ul className="pl-5">
                    <li><strong>Department of Agriculture:</strong> Understood the crop cycles and local productions and overcoming the issues such as stock imbalance for sales.</li>
                    <li><strong>Supply Chain Management:</strong> Optimizing distribution logistics accross multiple divisions.</li>
                    <li><strong>Nutrition:</strong> Providing nutritional benefits of greens to the community and spreading the wings of nutrition chain.</li>
                    <li><strong>Sustainability:</strong> Promoting eco-friendly practices and reducing waste by offering features like selling the overstocked food items or locally sourced products by individuals or farmers.</li>
                </ul>
            </section>

            <section className='px-4 py-2 bg-slate-100 rounded-lg my-5'>
                <h2 className='text-2xl font-serif font-semibold text-green-500'>Achieving relevant SDGs (Sustainable Development Goals)</h2>
                <ul className="pl-5">
                    <li><strong>SDG 2:</strong> Zero Hunger</li>
                    <li><strong>SDG 3:</strong> Good Health and Well-Being</li>
                    <li><strong>SDG 11:</strong> Sustainable Cities and Communities</li>
                    <li><strong>SDG 12:</strong> Responsible Consumption and Production</li>
                    <li><strong>SDG 13:</strong> Climate Action</li>
                </ul>
            </section>

            <section className='px-4 py-2 bg-slate-100 rounded-lg my-5'>
                <h2 className='text-2xl font-serif font-semibold text-green-500'>Project Objectives</h2>
                <ul className="pl-5">
                    <li>Launching an online web platform named "FreshBasket", a network to deliver fresh, locally sourced produce to urban neighborhoods and undeserved people.</li>
                    <li>Foster partnerships with local farmers for a sustainable supply chain.</li>
                    <li>Build a digital platform for ordering greens, tracking deliveries, and providing nutritional guidance.</li>
                    <li>Educating urban communities on healthy eating habits and sustainability practices.</li>
                    <li>Innovative ways to preserve greens and upcycle surplus produce to reduce food waste.</li>
                </ul>
            </section>

            <section className='px-4 py-2 bg-slate-100 rounded-lg my-5'>
                <h2 className='text-2xl font-serif font-semibold text-green-500'>What we are delivering?</h2>
                <ul className="pl-5">
                    <li>A fully operational prototype of the FreshBasket system for urban deployment.</li>
                    <li>A mobile and/or online platform to facilitate orders and community engagement.</li>
                    <li>Reports analyzing the nutritional impact on communities and the economic benefits to farmers.</li>
                    <li>Educational materials that promote health awareness and sustainable living.</li>
                    <li>Partnerships formalized with local farmers, community groups, and other stakeholders.</li>
                </ul>
            </section>

            <section className='px-4 py-2 bg-slate-100 rounded-lg my-5'>
                <h2 className='text-2xl font-serif font-semibold text-green-500'>Startup Opportunities</h2>
                <ul className="pl-5">
                    <li>Scalable solutions for urban and semi-urban greens distribution.</li>
                    <li>A comprehensive ecosystem for farmer-to-consumer connections.</li>
                    <li>Potential expansion into organic greens markets or nutrition-based product lines.</li>
                </ul>
            </section>

            <section className='px-4 py-2 bg-slate-100 rounded-lg my-5'>
                <h2 className='text-2xl font-serif font-semibold text-green-500'>Collaborators and Nature of Support</h2>
                <h3>Local Farmers</h3>
                <ul className="pl-5">
                    <li>Provide fresh produce.</li>
                    <li>Participate in the supply chain process.</li>
                </ul>

                <h3>Nutritionists and Dietitians</h3>
                <ul className="pl-5">
                    <li>Offer health insights and create dietary guides for customers.</li>
                </ul>

                <h3>Community Organizations</h3>
                <ul className="pl-5">
                    <li>Support outreach and educational campaigns.</li>
                    <li>Aid in distribution to underserved areas.</li>
                </ul>

                <h3>Tech Developers</h3>
                <ul className="pl-5">
                    <li>Design the digital platform for seamless ordering, tracking, and nutritional data.</li>
                </ul>

                <h3>Municipal Authorities</h3>
                <ul className="pl-5">
                    <li>Facilitate regulation approvals, permits, and logistical support for the cart network.</li>
                </ul>
            </section>
        </div>
    )
}

export default About