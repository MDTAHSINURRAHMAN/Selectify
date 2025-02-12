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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-banner-title"></div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>My Queries | Selectify</title>
        <meta name="description" content="My queries page of Selectify" />
      </Helmet>
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Logo />
        <Navbar />
      </div>
      <div className="min-h-screen bg-gray-50">
        {/* Banner Section */}
        {/* <div className="relative bg-banner-title text-white py-12 md:py-20">
          <motion.div
            className="container mx-auto px-4 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-3xl md:text-5xl font-bold mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              My Queries
            </motion.h1>

            <motion.div
              className="w-16 h-1 bg-white mx-auto mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            ></motion.div>

            <motion.button
              onClick={() => navigate("/add-query")}
              className="btn bg-white text-banner-title hover:bg-banner-title hover:text-white border-none px-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Add New Query
            </motion.button>
          </motion.div>
        </div> */}

        {/* Queries Section */}
        <div className="container mx-auto py-8 md:py-12 px-4">
          {queries.length === 0 ? (
            <div className="text-center bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                No Queries Found
              </h2>
              <button
                onClick={() => navigate("/add-query")}
                className="btn bg-banner-title text-white hover:bg-hover-color border-none"
              >
                Add Your First Query
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {queries.map((query) => (
                <div
                  key={query._id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={query.productImageUrl}
                    alt={query.productName}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />

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

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => navigate(`/query/${query._id}`)}
                        className="btn btn-block bg-banner-title text-white hover:bg-hover-color border-none"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => navigate(`/update-query/${query._id}`)}
                        className="btn btn-block btn-outline text-banner-title hover:bg-banner-title hover:text-white"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(query._id)}
                        className="btn btn-block bg-red-500 text-white hover:bg-red-600 border-none"
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
