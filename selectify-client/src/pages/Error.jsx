import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../components/shared/logo";
import { Helmet } from "react-helmet-async";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Helmet>
        <title>Error | Selectify</title>
        <meta name="description" content="Error page of Selectify" />
      </Helmet>
      <Logo></Logo>
      <div className="flex flex-col justify-center items-center h-screen bg-background-color text-center px-6">
        {" "}
        <motion.h1
          className="text-9xl font-bold text-red-500 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>
        <motion.button
          className="px-6 py-3 bg-red-500 text-white rounded-none shadow-md hover:bg-red-600 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/")}
        >
          Go Back Home
        </motion.button>
      </div>
    </div>
  );
};

export default Error;
