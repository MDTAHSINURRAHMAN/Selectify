import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Navbar from "../components/shared/Navbar";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const Reviews = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axios.get('https://selectify-sigma.vercel.app/all-reviews');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-4 text-gray-800 bg-clip-text text-transparent bg-banner-title">
          What Our Customers Say
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover what others think about their experience with Selectify
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-banner-title flex items-center justify-center text-white text-xl font-bold">
                  {review.userEmail?.split('@')[0]?.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {review.userEmail?.split('@')[0]}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(review.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="relative">
                <span className="text-5xl text-purple-200 absolute -top-4 -left-2">"</span>
                <p className="text-gray-700 relative z-10 pl-4">{review.review}</p>
                <span className="text-5xl text-purple-200 absolute -bottom-8 right-0">"</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
