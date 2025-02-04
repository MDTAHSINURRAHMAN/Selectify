import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../components/shared/logo";
import Navbar from "../components/shared/Navbar";
import { motion } from "framer-motion";
import Footer from "../components/shared/Footer";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const UpdateQueryPage = () => {
  const { id } = useParams(); // Get the query ID from the URL
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    productName: "",
    productBrand: "",
    productImageUrl: "",
    queryTitle: "",
    boycottReason: "",
  });

  useEffect(() => {
    // Fetch the existing query details from the backend
    fetch(`https://selectify-sigma.vercel.app/my-queries/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setQuery(data);
      })
      .catch((error) => {
        toast.error("Error fetching query data");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated data to the backend using fetch
    fetch(`https://selectify-sigma.vercel.app/query/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query), // Ensure query data is correctly formatted
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update query");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || "Query updated successfully");
        navigate("/queries"); // Redirect to the queries list page
      })
      .catch((error) => {
        toast.error("Error updating query");
      });
  };

  return (
    <div>
      <Helmet>
        <title>Update Query | Selectify</title>
        <meta name="description" content="Update query page of Selectify" />
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
            Update Query
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
            onClick={() => navigate("/my-queries")}
            className="bg-white text-banner-title px-8 py-3 rounded-none font-semibold shadow-md hover:bg-hover-color hover:text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          >
            My Queries
          </motion.button>
        </motion.div>
      </div>
      <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8 font-karla">
        {" "}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-none shadow-md max-w-lg mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            Update Query
          </h2>

          <div>
            <label
              htmlFor="productName"
              className="block text-gray-600 font-medium mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={query.productName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="productBrand"
              className="block text-gray-600 font-medium mb-2"
            >
              Product Brand
            </label>
            <input
              type="text"
              id="productBrand"
              name="productBrand"
              value={query.productBrand}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="productImageUrl"
              className="block text-gray-600 font-medium mb-2"
            >
              Product Image URL
            </label>
            <input
              type="text"
              id="productImageUrl"
              name="productImageUrl"
              value={query.productImageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="queryTitle"
              className="block text-gray-600 font-medium mb-2"
            >
              Query Title
            </label>
            <input
              type="text"
              id="queryTitle"
              name="queryTitle"
              value={query.queryTitle}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="boycottReason"
              className="block text-gray-600 font-medium mb-2"
            >
              Boycott Reason
            </label>
            <textarea
              id="boycottReason"
              name="boycottReason"
              value={query.boycottReason}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-banner-title rounded-none hover:bg-hover-color text-white font-medium py-3 transition duration-200"
          >
            Update Query
          </button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UpdateQueryPage;
