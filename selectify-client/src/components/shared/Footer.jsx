import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-banner-title font-karla text-white">
            <div className="container mx-auto px-4 py-12">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    {/* Logo & Description */}
                    <div className="flex flex-col gap-4 w-full md:w-1/3">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full"></div>
                            <h2 className="text-2xl font-bold">Selectify</h2>
                        </div>
                        <p className="text-white/80 text-sm">
                            Selectify is your one-stop platform for discovering, exploring, and selecting the best resources tailored to your needs.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4 w-full md:w-1/3">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="text-white/80 text-sm space-y-2">
                            <li><Link to="/" className="hover:text-white">Home</Link></li>
                            <li><Link to="/recommendations" className="hover:text-white">Recommendations</Link></li>
                            <li><Link to="/my-recommendations" className="hover:text-white">My Recommendations</Link></li>
                            <li><Link to="/my-queries" className="hover:text-white">My Queries</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="flex flex-col gap-4 w-full md:w-1/3">
                        <h3 className="text-lg font-semibold">Newsletter</h3>
                        <p className="text-white/80 text-sm">
                            Subscribe to get the latest updates and offers.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="flex-1 px-4 py-2 rounded-none text-black focus:outline-none" 
                            />
                            <button 
                                type="submit" 
                                className="px-6 py-2 bg-white text-banner-title rounded-none font-bold hover:bg-gray-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-white/20 my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/80 gap-4">
                    <p>&copy; {new Date().getFullYear()} Selectify. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a 
                            href="https://facebook.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-banner-title transition-all duration-300"
                        >
                            <FaFacebookF />
                        </a>
                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-banner-title transition-all duration-300"
                        >
                            <FaLinkedinIn />
                        </a>
                        <a 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-banner-title transition-all duration-300"
                        >
                            <FaTwitter />
                        </a>
                        <a 
                            href="https://instagram.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-banner-title transition-all duration-300"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
