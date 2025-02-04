import React from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Logo from "../components/shared/logo";
import Navbar from "../components/shared/Navbar";
import { motion } from "framer-motion";
import Footer from "../components/shared/Footer";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const AddQuery = () => {
  const [formData, setFormData] = React.useState({
    productName: "",
    productBrand: "",
    productImageUrl: "",
    queryTitle: "",
    boycottReason: "",
  });
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const queryData = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
      timestamp: new Date(),
      recommendationCount: 0,
    };

    try {
      const response = await fetch(
        "https://selectify-sigma.vercel.app/add-query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(queryData),
        }
      );

      if (response.ok) {
        navigate("/my-queries");
      }
    } catch (error) {
      toast.error("Error adding query");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Query | Selectify</title>
        <meta name="description" content="Add a new product query" />
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
            Add Query
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            className="w-20 h-1 bg-white mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          ></motion.div>

          {/* Call-to-Action Button */}
          <motion.button
            onClick={() => navigate("/queries")}
            className="bg-white text-banner-title px-8 py-3 rounded-none font-semibold shadow-md hover:bg-hover-color hover:text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          >
            All Query
          </motion.button>
        </motion.div>
      </div>
      <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8 font-karla">
        <div className="max-w-2xl mx-auto bg-white rounded-none shadow-lg overflow-hidden">
          <div className="p-8 sm:p-10 lg:p-12">
            <h2 className="text-3xl font-bold text-center text-banner-title mb-6">
              Add a Query
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-none shadow-sm focus:ring-2 focus:ring-banner-title focus:outline-none transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Brand
                </label>
                <input
                  type="text"
                  name="productBrand"
                  value={formData.productBrand}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-none shadow-sm focus:ring-2 focus:ring-banner-title focus:outline-none transition duration-200"
                  required
                />
              </div>

              {/* Product Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image URL
                </label>
                <input
                  type="url"
                  name="productImageUrl"
                  value={formData.productImageUrl}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-none shadow-sm focus:ring-2 focus:ring-banner-title focus:outline-none transition duration-200"
                  required
                />
              </div>

              {/* Query Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Query Title
                </label>
                <input
                  type="text"
                  name="queryTitle"
                  value={formData.queryTitle}
                  onChange={handleInputChange}
                  placeholder="Is there any better product that gives me the same quality?"
                  className="w-full p-3 border border-gray-300 rounded-none shadow-sm focus:ring-2 focus:ring-banner-title focus:outline-none transition duration-200"
                  required
                />
              </div>

              {/* Boycotting Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Boycotting Reason
                </label>
                <textarea
                  name="boycottReason"
                  value={formData.boycottReason}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-none shadow-sm focus:ring-2 focus:ring-banner-title focus:outline-none transition duration-200"
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-banner-title to-hover-color text-white font-bold py-3 rounded-none shadow-lg hover:from-hover-color hover:to-banner-title focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-banner-title transition-all duration-200"
                >
                  Add Query
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AddQuery;
