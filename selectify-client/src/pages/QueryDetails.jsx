import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import Logo from "../components/shared/logo";
import Loading from "../components/shared/Loading";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const QueryDetails = () => {
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [recommendation, setRecommendation] = useState({
    recommendationTitle: "",
    recommendedProductName: "",
    recommendedProductImage: "",
    recommendationReason: "",
  });

  useEffect(() => {
    const fetchQueryDetails = async () => {
      try {
        const response = await fetch(
          `https://selectify-sigma.vercel.app/query/${id}`
        );
        const data = await response.json();
        setQuery(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching query:", error);
        setLoading(false);
      }
    };

    fetchQueryDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecommendation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recommendationData = {
      ...recommendation,
      queryId: query._id,
      queryTitle: query.queryTitle,
      productName: query.productName,
      userEmail: query.userEmail,
      userName: query.userName,
      recommenderImage: user.photoURL,
      recommenderEmail: user.email,
      recommenderName: user.displayName,
      timestamp: new Date(),
    };

    try {
      const response = await fetch(
        "https://selectify-sigma.vercel.app/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recommendationData),
        }
      );

      if (response.ok) {
        // Update recommendation count
        await fetch(
          `https://selectify-sigma.vercel.app/query/${id}/increment-recommendations`,
          {
            method: "PATCH",
          }
        );

        toast.success("Recommendation added successfully!");
        setRecommendation({
          recommendationTitle: "",
          recommendedProductName: "",
          recommendedProductImage: "",
          recommendationReason: "",
        });
      }
    } catch (error) {
      toast.error("Failed to add recommendation");
    }
  };

  // Fetch recommendations for this query
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `https://selectify-sigma.vercel.app/recommendations/${id}`
        );
        const data = await response.json();
        // Sort recommendations by timestamp descending
        const sortedRecommendations = data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setRecommendations(sortedRecommendations);
      } catch (error) {
        toast.error("Error fetching recommendations");
      }
    };

    if (id) {
      fetchRecommendations();
    }
  }, [id]);

  // Render recommendations
  const renderRecommendations = () => {
    if (recommendations.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500 italic">
          No recommendations yet. Be the first to recommend!
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Helmet>
          <title>Query Details | Selectify</title>
          <meta
            name="description"
            content="Recommendations page of Selectify"
          />
        </Helmet>
        {recommendations.map((rec) => (
          <div
            key={rec._id}
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border-l-4 border-banner-title"
          >
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Recommender Image */}
              <div className="flex-shrink-0">
                <img
                  src={
                    rec.recommenderImage ||
                    "https://i.ibb.co/VqWBk8J/slider1.jpg"
                  }
                  alt={rec.recommenderName}
                  className="w-16 h-16 rounded-full border-2 border-banner-title mx-auto sm:mx-0"
                />
              </div>

              {/* Recommendation Content */}
              <div className="flex-grow">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                  <h3 className="text-lg font-bold text-banner-title">
                    {rec.recommendationTitle}
                  </h3>
                  <span className="text-sm text-gray-500 italic mt-1 sm:mt-0">
                    {new Date(rec.timestamp).toLocaleDateString()}
                  </span>
                </div>

                {/* Recommender Name */}
                <p className="text-sm font-medium text-gray-500">
                  Recommended by{" "}
                  <span className="font-semibold text-hover-color">
                    {rec.recommenderName}
                  </span>
                </p>

                {/* Product Image */}
                <div className="my-4">
                  <img
                    src={rec.recommendedProductImage}
                    alt={rec.recommendedProductName}
                    className="w-full h-48 sm:h-36 object-cover rounded-md shadow-sm"
                  />
                </div>

                {/* Product Name */}
                <p className="text-gray-700 font-medium mb-2">
                  Recommended Product:{" "}
                  <span className="font-semibold text-hover-color">
                    {rec.recommendedProductName}
                  </span>
                </p>

                {/* Recommendation Reason */}
                <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-md shadow-inner">
                  "{rec.recommendationReason}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return <Loading></Loading>;
  }

  if (!query) {
    return <div className="text-center mt-8">Query not found</div>;
  }

  return (
    <div>
      <Logo></Logo>
      <Navbar></Navbar>
      <div className="min-h-screen font-karla bg-gray-100">
        {/* Query Creator Information */}
        <div className="bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-lg p-6 mb-8 relative">
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-banner-title rounded-br-full opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-banner-title rounded-tl-full opacity-20"></div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide border-b-2 border-banner-title pb-2">
            Query Creator
          </h2>

          {/* User Info */}
          <div className="flex items-center gap-6">
            <img
              src={query.userImage}
              alt={query.userName}
              className="w-20 h-20 rounded-full border-4 border-banner-title shadow-md"
            />
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">
                {query.userName}
              </h3>
              <p className="text-lg text-gray-500 italic">{query.userEmail}</p>
            </div>
          </div>

          {/* Decorative Line */}
          <div className="mt-4 h-1 w-full bg-gradient-to-r from-banner-title to-banner-title rounded-full"></div>
        </div>

        {/* Add Recommendation Form */}
        <div className="bg-background-color text-white rounded-none shadow-lg p-8 mb-10 relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-white opacity-20 rounded-br-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white opacity-20 rounded-tl-full blur-3xl"></div>

          {/* Form Heading */}
          <h2 className="text-3xl text-banner-title font-bold mb-8 text-center drop-shadow-md tracking-wide">
            Add a Recommendation
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recommendation Title */}
              <div>
                <label className="block text-lg text-banner-title font-semibold mb-2">
                  Recommendation Title
                </label>
                <input
                  type="text"
                  name="recommendationTitle"
                  value={recommendation.recommendationTitle}
                  onChange={handleChange}
                  className="w-full p-3 border border-white bg-white text-banner-title shadow-sm focus:ring-2 focus:ring-banner-title rounded-none outline-none transition duration-300"
                  required
                />
              </div>

              {/* Recommended Product Name */}
              <div>
                <label className="block text-lg text-banner-title font-semibold mb-2">
                  Recommended Product Name
                </label>
                <input
                  type="text"
                  name="recommendedProductName"
                  value={recommendation.recommendedProductName}
                  onChange={handleChange}
                  className="w-full p-3 border border-white bg-white text-banner-title shadow-sm focus:ring-2 focus:ring-banner-title rounded-none outline-none transition duration-300"
                  required
                />
              </div>
            </div>

            {/* Recommended Product Image */}
            <div>
              <label className="block text-lg text-banner-title font-semibold mb-2">
                Recommended Product Image
              </label>
              <input
                type="url"
                name="recommendedProductImage"
                value={recommendation.recommendedProductImage}
                onChange={handleChange}
                className="w-full p-3 border border-white bg-white text-banner-title shadow-sm focus:ring-2 focus:ring-banner-title rounded-none outline-none transition duration-300"
                required
              />
            </div>

            {/* Recommendation Reason */}
            <div>
              <label className="block text-lg text-banner-title font-semibold mb-2">
                Recommendation Reason
              </label>
              <textarea
                name="recommendationReason"
                value={recommendation.recommendationReason}
                onChange={handleChange}
                className="w-full p-3 border border-white bg-white text-banner-title shadow-sm h-36 focus:ring-2 focus:ring-banner-title rounded-none outline-none transition duration-300"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-banner-title text-white font-bold text-lg py-3 rounded-none shadow-lg hover:bg-hover-color hover:text-white hover:shadow-xl transition-all duration-300"
            >
              Add Recommendation
            </button>
          </form>
        </div>

        {/* Recommendations List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl text-banner-title font-bold mb-6">
            Recommendations
          </h2>
          {renderRecommendations()}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default QueryDetails;
