import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";
import Logo from "../components/shared/logo";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `https://selectify-sigma.vercel.app/recommendations-for-my-queries/${user?.email}`
        );
        const data = await response.json();
        setRecommendations(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchRecommendations();
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Recommendations | Selectify</title>
        <meta name="description" content="Recommendations page of Selectify" />
      </Helmet>

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Logo />
        <Navbar />
      </div>

      {/* Hero Section */}
      {/* <div className="relative bg-banner-title text-white py-16 overflow-hidden">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold mb-6 tracking-wide drop-shadow-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Recommendations for My Queries
          </motion.h1>

          <motion.div
            className="w-20 h-1 bg-white mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          ></motion.div>
        </motion.div>
      </div> */}

      {/* Main Content */}
      <div className="flex-grow bg-gradient-to-r from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8 font-karla">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg font-medium text-gray-600 animate-pulse">
              Loading recommendations...
            </p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg font-semibold text-gray-500">
              No recommendations found for your queries.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse shadow-lg overflow-hidden bg-white">
              <thead className="bg-gradient-to-r from-banner-title to-banner-title text-white">
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-bold tracking-wide">
                    Product Name
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-bold tracking-wide hidden md:table-cell">
                    Recommender Name
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-bold tracking-wide">
                    Recommended Product
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-bold tracking-wide hidden lg:table-cell">
                    Title
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-bold tracking-wide hidden xl:table-cell">
                    Reason
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-bold tracking-wide hidden lg:table-cell">
                    Query Title
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recommendations.map((rec) => (
                  <tr
                    key={rec._id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-4 md:px-6 py-4 text-gray-700 text-sm">
                      {rec.productName}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-gray-700 text-sm hidden md:table-cell">
                      {rec.recommenderName}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-gray-700 text-sm">
                      {rec.recommendedProductName}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-gray-700 text-sm hidden lg:table-cell">
                      {rec.recommendationTitle}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-gray-700 text-sm hidden xl:table-cell">
                      {rec.recommendationReason}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-gray-700 text-sm hidden lg:table-cell">
                      {rec.queryTitle}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Recommendations;
