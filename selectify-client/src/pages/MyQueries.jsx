import React from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Logo from "../components/shared/logo";
import Navbar from "../components/shared/Navbar";
import { motion } from "framer-motion";
import Footer from "../components/shared/Footer";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const MyQueries = () => {
  const [queries, setQueries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch(
          `https://selectify-sigma.vercel.app/my-queries/${user.email}`
        );
        const data = await response.json();
        setQueries(data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching queries");
        setLoading(false);
      }
    };
    fetchQueries();
  }, [user.email]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this query?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `https://selectify-sigma.vercel.app/query/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setQueries(queries.filter((query) => query._id !== id));
        }
      } catch (error) {
        toast.error("Error deleting query");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>My Queries | Selectify</title>
        <meta name="description" content="My queries page of Selectify" />
      </Helmet>
      <Logo></Logo>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-100">
        {/* Banner Section */}
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
              My Queries
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
              onClick={() => navigate("/add-query")}
              className="bg-white text-banner-title px-8 py-3 rounded-none font-semibold shadow-md hover:bg-hover-color hover:text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              Add New Query
            </motion.button>
          </motion.div>
        </div>

        {/* Queries Section */}
        <div className="max-w-7xl mx-auto py-12 px-4">
          {queries.length === 0 ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                No Queries Found
              </h2>
              <button
                onClick={() => navigate("/add-query")}
                className="bg-gradient-to-r from-banner-title to-hover-color hover:from-hover-color hover:to-banner-title text-white font-bold py-3 px-6 rounded-none shadow-lg transform transition duration-300 hover:scale-105"
              >
                Add Your First Query
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {queries.map((query) => (
                <div
                  key={query._id}
                  className="bg-white rounded-none shadow-lg overflow-hidden hover:shadow-xl transform transition duration-300 hover:scale-105"
                >
                  {/* Product Image */}
                  <img
                    src={query.productImageUrl}
                    alt={query.productName}
                    className="w-full h-48 object-cover"
                  />

                  {/* Query Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-banner-title mb-2 truncate">
                      {query.queryTitle}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">
                      <span className="font-medium">Product:</span>{" "}
                      {query.productName}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      <span className="font-medium">Brand:</span>{" "}
                      {query.productBrand}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => navigate(`/query/${query._id}`)}
                        className="flex-1 bg-banner-title hover:bg-hover-color text-white text-sm font-medium py-2 px-2 rounded-none shadow transition duration-300"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => navigate(`/update-query/${query._id}`)}
                        className="flex-1 border-banner-title border hover:bg-hover-color hover:text-white text-banner-title text-sm font-medium py-2 px-2 rounded-none shadow transition duration-300"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(query._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-2 rounded-none shadow transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MyQueries;
