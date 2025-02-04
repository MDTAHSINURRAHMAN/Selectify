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
        // Delete the recommendation
        const deleteResponse = await fetch(
          `https://selectify-sigma.vercel.app/recommendations/${id}`,
          {
            method: "DELETE",
          }
        );

        if (deleteResponse.ok) {
          // Decrease recommendation count for the query
          await fetch(
            `https://selectify-sigma.vercel.app/query/${queryId}/decrement-recommendations`,
            {
              method: "PATCH",
            }
          );

          // Update local state
          setRecommendations((prev) => prev.filter((rec) => rec._id !== id));
          toast.success("Recommendation deleted successfully");
        }
      } catch (error) {
        toast.error("Failed to delete recommendation");
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>My Recommendations | Selectify</title>
        <meta
          name="description"
          content="My recommendations page of Selectify"
        />
      </Helmet>
      <Logo></Logo>
      <Navbar></Navbar>
      <div className="relative bg-banner-title text-white py-16 overflow-hidden">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Section Heading */}
          <motion.h1
            className="text-5xl font-extrabold mb-6 tracking-wide drop-shadow-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            My Recommendations
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            className="w-20 h-1 bg-white mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          ></motion.div>

          {/* Call-to-Action Button */}
          {/* <motion.button
              onClick={() => navigate("/")}
              className="bg-white text-banner-title px-8 py-3 rounded-none font-semibold shadow-md hover:bg-hover-color hover:text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              Home
            </motion.button> */}
        </motion.div>
      </div>
      <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8 font-karla">
        {loading ? (
          <div className="text-center py-10">
            <p className="text-lg font-semibold text-gray-600">
              Loading recommendations...
            </p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg font-semibold text-gray-600">
              No recommendations found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse shadow-lg rounded-none overflow-hidden">
              <thead className="bg-gradient-to-r from-banner-title to-banner-title text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold tracking-wide">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold tracking-wide">
                    Recommendation Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold tracking-wide">
                    Recommendation Reason
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {recommendations.map((rec) => (
                  <tr
                    key={rec._id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="px-6 py-4 text-gray-700 text-sm">
                      {rec.productName}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">
                      {rec.recommendationTitle}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">
                      {rec.recommendationReason}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(rec._id, rec.queryId)}
                        className="bg-red-500 text-white px-4 py-2 rounded-none hover:bg-red-600 transition duration-200 shadow-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MyRecommendations;
