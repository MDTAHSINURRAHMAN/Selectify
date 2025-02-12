import React from "react";
import { motion } from "framer-motion";

const ComparisonSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular User",
      image: "https://i.pravatar.cc/150?img=1",
      quote: "Selectify helped me make informed choices about the products I buy. The recommendations are always thoughtful and align with my values."
    },
    {
      name: "Michael Chen", 
      role: "Community Member",
      image: "https://i.pravatar.cc/150?img=2",
      quote: "I love how this platform brings together people who care about ethical consumption. The alternatives suggested are practical and accessible."
    },
    {
      name: "Emma Williams",
      role: "Active Contributor", 
      image: "https://i.pravatar.cc/150?img=3",
      quote: "Being able to both receive and give recommendations makes this a truly collaborative space. It's empowering to help others make better choices."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            What People Say
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Hear from our community members
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
