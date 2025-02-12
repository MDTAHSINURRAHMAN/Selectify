import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Navbar from "../components/shared/Navbar";
import Logo from "../components/shared/logo";
import "../css/custom-swiper-bullet.css";
import Footer from "../components/shared/Footer";
import ComparisonSection from "../components/Features";
import { Helmet } from "react-helmet-async";
import Reviews from "./Reviews";
const Home = () => {
  const [recentQueries, setRecentQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchRecentQueries = async () => {
      try {
        const response = await axios.get(
          "https://selectify-sigma.vercel.app/all-queries"
        );
        const sortedQueries = response.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setRecentQueries(sortedQueries.slice(0, 6));
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching queries");
        setLoading(false);
      }
    };
    fetchRecentQueries();
  }, []);

  const sliderData = [
    {
      image: "https://i.ibb.co.com/9gHxdk2/pexels-paula-schmidt-353488-963486.jpg",
      title: "Comfort",
      subtitle: "Stylish Seating",
      description: "Discover the perfect chairs to enhance your comfort and style for any room in your home.",
    },
    {
      image: "https://i.ibb.co.com/kMS2Y25/pexels-pixabay-276534.jpg", 
      title: "Elegance",
      subtitle: "Modern Living",
      description: "Explore sleek and functional furniture options to transform your living space into a modern haven.",
    },
    {
      image: "https://i.ibb.co.com/8BX4JvT/pexels-fotoaibe-1743229.jpg",
      title: "Relaxation", 
      subtitle: "Cozy Bedrooms",
      description: "Create a restful sanctuary with thoughtfully recommended bedroom essentials.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Helmet>
        <title>Home | Selectify</title>
        <meta name="description" content="Home page of Selectify" />
      </Helmet>

      {/* Fixed Header Section */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Logo />
        <div className="w-full">
          <Navbar />
        </div>
      </div>

      {/* Main Content with Padding Top to Account for Fixed Header */}
      <main className="pt-[140px] pb-16">
        {/* Hero Slider Section */}
        <section className="relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="group"
          >
            {sliderData.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-[70vh] overflow-hidden"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                  <AnimatePresence>
                    <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-8">
                      <motion.h2
                        className="text-3xl md:text-5xl text-white font-light tracking-wider mb-4"
                        initial={{ y: -50, opacity: 0 }}
                        animate={activeIndex === index ? { y: 0, opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        {slide.title}
                      </motion.h2>

                      <motion.h3
                        className="text-4xl md:text-7xl text-white font-bold tracking-tight mb-6"
                        initial={{ scale: 0.8 }}
                        animate={activeIndex === index ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {slide.subtitle}
                      </motion.h3>

                      <motion.p
                        className="text-lg md:text-xl text-gray-200 max-w-2xl"
                        initial={{ x: -40, opacity: 0 }}
                        animate={activeIndex === index ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        {slide.description}
                      </motion.p>
                    </div>
                  </AnimatePresence>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Recent Queries Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Recent Queries
          </h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-banner-title border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentQueries.map((query) => (
                <motion.div
                  key={query._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative">
                    <img
                      src={query.productImageUrl}
                      alt={query.productName}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-banner-title text-white text-sm font-medium px-3 py-1 rounded-full">
                      New
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {query.productName}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Brand: {query.productBrand}
                    </p>

                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={query.userImage}
                        alt={query.userName}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-banner-title"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {query.userName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(query.timestamp).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <a
                      href={`/query/${query._id}`}
                      className="block w-full text-center bg-banner-title hover:bg-hover-color text-white font-medium py-3 rounded-lg transition-colors duration-300"
                    >
                      See More
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Statistics Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Our Impact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Total Queries",
                  value: recentQueries.length,
                  increase: "12%",
                  period: "from last month",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )
                },
                {
                  title: "Active Users",
                  value: "2.7k",
                  increase: "25%",
                  period: "from last week",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )
                },
                {
                  title: "Avg Response Time",
                  value: "1.2s",
                  increase: "30%",
                  period: "faster than average",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-xl p-8 border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-banner-title/10 rounded-lg">
                      <div className="text-banner-title">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-4xl font-bold text-gray-900 mb-4">
                    {stat.value}
                  </p>
                  <div className="flex items-center text-sm">
                    <span className="text-green-500 font-medium">↑ {stat.increase}</span>
                    <span className="text-gray-500 ml-2">{stat.period}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ComparisonSection />
        <Reviews />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
