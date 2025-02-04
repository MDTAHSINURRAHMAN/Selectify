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
import FeaturesSection from "../components/Features";
import { Helmet } from "react-helmet-async";
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
      image:
        "https://i.ibb.co.com/9gHxdk2/pexels-paula-schmidt-353488-963486.jpg",
      title: "Comfort",
      subtitle: "Stylish Seating",
      description:
        "Discover the perfect chairs to enhance your comfort and style for any room in your home.",
    },
    {
      image: "https://i.ibb.co.com/kMS2Y25/pexels-pixabay-276534.jpg",
      title: "Elegance",
      subtitle: "Modern Living",
      description:
        "Explore sleek and functional furniture options to transform your living space into a modern haven.",
    },
    {
      image: "https://i.ibb.co.com/8BX4JvT/pexels-fotoaibe-1743229.jpg",
      title: "Relaxation",
      subtitle: "Cozy Bedrooms",
      description:
        "Create a restful sanctuary with thoughtfully recommended bedroom essentials.",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Home | Selectify</title>
        <meta name="description" content="Home page of Selectify" />
      </Helmet>
      <Logo></Logo>
      <Navbar></Navbar>
      <div className="pb-8">
        {/* Slider Section */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          navigation
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {sliderData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative h-[300px] md:h-[600px] rounded-none overflow-hidden"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <AnimatePresence>
                  <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start text-white pl-0 md:pl-20">
                    {/* Title Animation */}
                    <motion.h2
                      className="text-2xl md:text-4xl text-center md:text-left text-banner-title font-karla font-normal tracking-widest"
                      initial={{ y: -50, opacity: 0 }}
                      animate={
                        activeIndex === index
                          ? { y: 0, opacity: 1 }
                          : { opacity: 0 }
                      }
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 80,
                      }}
                    >
                      {slide.title}
                    </motion.h2>

                    {/* Subtitle Animation */}
                    <motion.h3
                      className="mt-2 md:mt-4 text-2xl md:text-5xl text-center md:text-left text-banner-title font-karla font-bold tracking-widest"
                      initial={{ scale: 0 }}
                      animate={
                        activeIndex === index
                          ? { scale: 1, opacity: 1 }
                          : { scale: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {slide.subtitle}
                    </motion.h3>

                    {/* Description Animation */}
                    <motion.p
                      className="mt-2 md:mt-6 text-sm md:text-2xl text-center md:text-left text-background-color font-karla font-normal"
                      initial={{ x: -100, opacity: 0 }}
                      animate={
                        activeIndex === index
                          ? { x: 0, opacity: 1 }
                          : { x: 100, opacity: 0 }
                      }
                      transition={{ duration: 0.7, delay: 0.5 }}
                    >
                      {slide.description}
                    </motion.p>
                  </div>
                </AnimatePresence>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Recent Queries Section */}
        <div className="mt-10 font-karla">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Recent Queries
          </h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <p className="text-lg text-gray-500 animate-pulse">
                Loading recent queries...
              </p>
            </div>
          ) : (
            <div className="font-poppins grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10">
              {recentQueries.map((query) => (
                <motion.div
                  key={query._id}
                  className="relative bg-gray-100 text-white shadow-lg rounded-none p-6 hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Ribbon Decor */}
                  <div className="absolute top-0 left-0 bg-hover-color text-white text-sm font-bold px-3 py-1 rounded-br-md shadow-md">
                    New
                  </div>

                  {/* Product Image */}
                  <img
                    src={query.productImageUrl}
                    alt={query.productName}
                    className="w-full h-48 object-cover rounded-none"
                  />

                  {/* Product Details */}
                  <div className="mt-4">
                    <h3 className="text-md font-semibold text-banner-title">
                      {query.productName}
                    </h3>
                    <p className="text-xl font-normal text-gray-500">
                      Brand: {query.productBrand}
                    </p>
                  </div>

                  {/* User Information */}
                  <div className="flex items-center mt-4">
                    <img
                      src={query.userImage}
                      alt={query.userName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-hover-color"
                    />
                    <div className="ml-3">
                      <p className="text-sm text-banner-title font-semibold">
                        {query.userName}
                      </p>
                      <p className="text-xs text-gray-400">
                        Posted on:{" "}
                        {new Date(query.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="mt-6 text-center">
                    <a
                      href={`/queries`} // Adjust the URL path as per your routing logic
                      className="px-4 py-2 bg-hover-color text-white font-semibold rounded-none shadow-md hover:bg-gray-100 hover:text-banner-title transition-all duration-300"
                    >
                      Read More
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Decorative Stats Section */}
        <div className="px-10 sm:px-6 lg:px-8 py-12 rounded-none">
          <h2 className="text-4xl font-karla font-bold mb-8 text-center text-gray-800">
            Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Total Queries Card */}
            <motion.div
              className="bg-white p-6 rounded-none shadow-md border-l-4 border-banner-title"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Queries
                  </p>
                  <p className="text-3xl font-bold text-banner-title">
                    {recentQueries.length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-banner-title"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-banner-title text-sm font-semibold">
                    ↑ 12%
                  </span>
                  <span className="text-gray-400 text-sm ml-2">
                    from last month
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Active Users Card */}
            <motion.div
              className="bg-white p-6 rounded-none shadow-md border-l-4 border-banner-title"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Active Users
                  </p>
                  <p className="text-3xl font-bold text-banner-title">2.7k</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-banner-title"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-banner-title text-sm font-semibold">
                    ↑ 25%
                  </span>
                  <span className="text-gray-400 text-sm ml-2">
                    from last week
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Response Time Card */}
            <motion.div
              className="bg-white p-6 rounded-none shadow-md border-l-4 border-banner-title"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Avg Response Time
                  </p>
                  <p className="text-3xl font-bold text-banner-title">1.2s</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-banner-title"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-banner-title text-sm font-semibold">
                    ↓ 30%
                  </span>
                  <span className="text-gray-400 text-sm ml-2">
                    faster than average
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <FeaturesSection></FeaturesSection>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
