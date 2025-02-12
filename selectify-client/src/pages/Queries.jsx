import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Logo from "../components/shared/logo";
import Navbar from "../components/shared/Navbar";
import { motion } from "framer-motion";
import Footer from "../components/shared/Footer";
import { FaSearch, FaThLarge, FaThList, FaTh } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [layout, setLayout] = useState("grid-3");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch(
          "https://selectify-sigma.vercel.app/all-queries"
        );
        const data = await response.json();
        const sortedQueries = data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setQueries(sortedQueries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching queries:", error);
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  const handleReviewSubmit = async () => {
    if (!user) {
      toast.error("Please login first to add a review");
      return;
    }

    if (!review.trim()) {
      toast.error("Please write a review before submitting");
      return;
    }

    try {
      const response = await fetch("https://selectify-sigma.vercel.app/add-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          queryId: selectedQuery._id,
          userId: user.uid,
          userEmail: user.email,
          review: review,
          timestamp: new Date(),
        }),
      });

      if (response.ok) {
        toast.success("Review added successfully!");
        setReview("");
        setShowReviewModal(false);
      } else {
        toast.error("Failed to add review");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Error adding review");
    }
  };

  const filteredQueries = queries.filter((query) =>
    query.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  const getGridClass = () => {
    switch (layout) {
      case "grid-1":
        return "grid grid-cols-1 gap-6";
      case "grid-2":
        return "grid grid-cols-1 md:grid-cols-2 gap-6";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>All Queries | Selectify</title>
        <meta
          name="description"
          content="Browse and search through all product queries and recommendations"
        />
      </Helmet>
      <Logo />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Queries</h1>
          <button
            onClick={() => {
              if (!user) {
                toast.error("Please login first to add a query");
                return;
              }
              navigate("/add-query");
            }}
            className="inline-flex items-center px-6 py-3 border border-black bg-black text-white hover:bg-white hover:text-black transition-colors duration-200 text-sm font-medium"
          >
            Add New Query
          </button>
        </div> */}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setLayout("grid-1")}
              className={`p-2 ${
                layout === "grid-1"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black"
              }`}
            >
              <FaThList className="text-xl" />
            </button>
            <button
              onClick={() => setLayout("grid-2")}
              className={`p-2 ${
                layout === "grid-2"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black"
              }`}
            >
              <FaTh className="text-xl" />
            </button>
            <button
              onClick={() => setLayout("grid-3")}
              className={`p-2 ${
                layout === "grid-3"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black"
              }`}
            >
              <FaThLarge className="text-xl" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : filteredQueries.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              {searchText ? "No matching queries found" : "No Queries Found"}
            </h2>
            <button
              onClick={() => navigate("/add-query")}
              className="px-6 py-3 bg-black text-white hover:bg-white hover:text-black border border-black transition-colors duration-200"
            >
              Add Your First Query
            </button>
          </div>
        ) : (
          <div className={getGridClass()}>
            {filteredQueries.map((query) => (
              <div
                key={query._id}
                className="bg-white border border-gray-200 hover:border-black transition-colors duration-200"
              >
                <div className={layout === "grid-1" ? "flex" : "block"}>
                  <img
                    src={query.productImageUrl}
                    alt={query.productName}
                    className={`object-cover ${
                      layout === "grid-1" ? "w-1/3" : "w-full h-64"
                    }`}
                  />

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {query.queryTitle}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Brand:</span> {query.productBrand}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <span className="font-medium">Product:</span> {query.productName}
                    </p>
                    
                    <div className="flex flex-wrap justify-between items-center gap-3 mt-4">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">{query.recommendationCount}</span> Recommendations
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => navigate(`/query/${query._id}`)}
                          className="px-4 py-2 bg-black text-white hover:bg-white hover:text-black border border-black transition-colors duration-200"
                        >
                          Recommend
                        </button>
                        <button
                          onClick={() => {
                            setSelectedQuery(query);
                            setShowReviewModal(true);
                          }}
                          className="px-4 py-2 bg-white text-black border border-black hover:bg-black hover:text-white transition-colors duration-200"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
            <p className="text-gray-600 mb-4">
              Product: {selectedQuery?.productName}
            </p>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black mb-4"
              placeholder="Write your review here..."
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setReview("");
                }}
                className="px-4 py-2 text-black hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-black text-white hover:bg-white hover:text-black border border-black transition-colors duration-200"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Queries;
