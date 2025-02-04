import React from "react";
import { motion } from "framer-motion";
import {
  FaEye,
  FaLightbulb,
  FaTree,
  FaShieldAlt,
  FaTint,
  FaGlobe,
} from "react-icons/fa";

const features = [
  {
    title: "Protects your eyes",
    icon: <FaEye />,
    description:
      "Equipped with state-of-the-art blue light filters, this feature minimizes eye fatigue and ensures optimal comfort, especially during prolonged usage.",
  },
  {
    title: "Advance Light Protection",
    icon: <FaLightbulb />,
    description:
      "Innovative light-sensitive technology adapts to your surroundings, delivering the perfect brightness and clarity for any environment.",
  },
  {
    title: "Green Energy Produce",
    icon: <FaTree />,
    description:
      "Designed with eco-conscious energy sources, it significantly reduces emissions while promoting sustainable living and environmental care.",
  },
  {
    title: "Splash Resistant",
    icon: <FaTint />,
    description:
      "Resilient against spills and splashes, this feature ensures your device stays functional and reliable in unexpected conditions.",
  },
  {
    title: "Available Globally",
    icon: <FaGlobe />,
    description:
      "Easily accessible in numerous countries, ensuring seamless availability no matter where you are in the world.",
  },
  {
    title: "Steel Frame",
    icon: <FaShieldAlt />,
    description:
      "Crafted with a robust steel frame, it provides unmatched durability and a sleek, modern aesthetic for any setting.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="min-h-screen font-karla bg-gradient-to-b from-white to-gray-100 flex flex-col justify-center items-center px-6 py-12">
      <h2 className="text-3xl text-center md:text-5xl font-bold text-gray-800 mb-12">
        Explore The Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl">
        {/* Left Column */}
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-6 bg-white p-6 rounded-none shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="text-4xl text-red-500">{feature.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Center Image */}
      <motion.div
        className="mt-12 flex-shrink-0"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://via.placeholder.com/300x400" // Replace with your product image
          alt="Product"
          className="w-64 md:w-80 rounded-lg shadow-md"
        />
      </motion.div>
    </div>
  );
};

export default FeaturesSection;
