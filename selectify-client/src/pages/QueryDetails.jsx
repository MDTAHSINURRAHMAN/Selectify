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
      productImageUrl: query.productImageUrl,
      productBrand: query.productBrand,
      boycottReason: query.boycottReason,
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

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `https://selectify-sigma.vercel.app/recommendations/${id}`
        );
        const data = await response.json();
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

  const renderRecommendations = () => {
    if (recommendations.length === 0) {
      return (
        <div className="flex items-center justify-center h-40 text-gray-500">
          <p className="text-lg font-medium">No recommendations yet. Be the first to recommend!</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <Helmet>
          <title>Query Details | Selectify</title>
          <meta name="description" content="Recommendations page of Selectify" />
        </Helmet>
        {recommendations.map((rec) => (
          <div key={rec._id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            <div className="relative h-48">
              <img
                src={rec.recommendedProductImage}
                alt={rec.recommendedProductName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <p className="text-sm text-gray-600">{new Date(rec.timestamp).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={rec.recommenderImage || "https://i.ibb.co/VqWBk8J/slider1.jpg"}
                  alt={rec.recommenderName}
                  className="w-12 h-12 rounded-full border-2 border-banner-title"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{rec.recommenderName}</h4>
                  <p className="text-sm text-gray-500">Recommender</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{rec.recommendationTitle}</h3>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Recommended Product:</p>
                <p className="text-lg text-banner-title">{rec.recommendedProductName}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{rec.recommendationReason}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <Loading />;
  if (!query) return <div className="text-center mt-8">Query not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Logo />
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-banner-title to-hover-color p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={query.userImage}
                alt={query.userName}
                className="w-24 h-24 rounded-full border-4 border-white/30"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{query.userName}</h1>
                <p className="text-white/80">{query.userEmail}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Your Recommendation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recommendation Title
                  </label>
                  <input
                    type="text"
                    name="recommendationTitle"
                    value={recommendation.recommendationTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-banner-title focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="recommendedProductName"
                    value={recommendation.recommendedProductName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-banner-title focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image URL
                </label>
                <input
                  type="url"
                  name="recommendedProductImage"
                  value={recommendation.recommendedProductImage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-banner-title focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recommendation Reason
                </label>
                <textarea
                  name="recommendationReason"
                  value={recommendation.recommendationReason}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-banner-title focus:border-transparent resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-banner-title text-white font-semibold rounded-lg hover:bg-hover-color transition-colors duration-300"
              >
                Submit Recommendation
              </button>
            </form>
          </div>
        </div>

        <section className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recommendations</h2>
          {renderRecommendations()}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default QueryDetails;
