import React from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import Logo from "../components/shared/logo";
import Navbar from "../components/shared/Navbar";
import { motion } from "framer-motion";
import Footer from "../components/shared/Footer";
import { Helmet } from "react-helmet-async";

const MyRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRecommendations = async () => {
      try {
        const response = await fetch(
          `https://selectify-sigma.vercel.app/my-recommendations/${user?.email}`
        );
        const data = await response.json();
        setRecommendations(data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching recommendations");
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchMyRecommendations();
    }
  }, [user]);

  const handleDelete = async (id, queryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recommendation?"
    );

    if (confirmed) {
      try {
        const deleteResponse = await fetch(
          `https://selectify-sigma.vercel.app/recommendations/${id}`,
          {
            method: "DELETE",
          }
        );

        if (deleteResponse.ok) {
          await fetch(
            `https://selectify-sigma.vercel.app/query/${queryId}/decrement-recommendations`,
            {
              method: "PATCH",
            }
          );

          setRecommendations((prev) => prev.filter((rec) => rec._id !== id));
          toast.success("Recommendation deleted successfully");
        }
      } catch (error) {
        toast.error("Failed to delete recommendation");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>My Recommendations | Selectify</title>
        <meta
          name="description"
          content="My recommendations page of Selectify"
        />
      </Helmet>

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Logo />
        <Navbar />
      </div>

      {/* Hero Section */}
      {/* <div className="bg-banner-title text-white py-12 md:py-20">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            My Recommendations
          </h1>
          <div className="w-16 h-1 bg-white mx-auto"></div>
        </motion.div>
      </div> */}

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-banner-title"></div>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl text-gray-600">No recommendations found</h2>
            <p className="text-gray-500 mt-2">Start by adding some recommendations</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-banner-title text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold hidden md:table-cell">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold hidden lg:table-cell">Reason</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recommendations.map((rec) => (
                    <tr key={rec._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-900">{rec.productName}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden md:table-cell">{rec.recommendationTitle}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden lg:table-cell">
                        <div className="max-w-xs truncate">{rec.recommendationReason}</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleDelete(rec._id, rec.queryId)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyRecommendations;
