import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/shared/Navbar";
import Logo from "../components/shared/logo";
import Footer from "../components/shared/Footer";
import { Helmet } from "react-helmet-async";

const WhatPeopleSay = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          "https://selectify-sigma.vercel.app/recommendations"
        );
        const sortedRecommendations = response.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setRecommendations(sortedRecommendations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>What People Say | Selectify</title>
        <meta
          name="description"
          content="See what people are recommending on Selectify"
        />
      </Helmet>
      <Logo />
      <Navbar />

      <div className="relative bg-banner-title text-white py-16">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold mb-6">What People Say</h1>
          <div className="w-20 h-1 bg-white mx-auto"></div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              No recommendations yet
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((recommendation) => (
              <motion.div
                key={recommendation._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-none shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={recommendation.recommenderImage}
                      alt={recommendation.recommenderName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-lg">
                        {recommendation.recommenderName}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Recommended for: {recommendation.queryTitle}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <img
                      src={recommendation.recommendedProductImage}
                      alt={recommendation.recommendedProductName}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  <h4 className="font-bold text-xl mb-2">
                    {recommendation.recommendationTitle}
                  </h4>
                  <p className="text-gray-700 mb-4">
                    {recommendation.recommendationReason}
                  </p>

                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Product: {recommendation.recommendedProductName}</span>
                    <span>
                      {new Date(recommendation.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WhatPeopleSay;
