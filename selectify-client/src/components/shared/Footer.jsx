import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-banner-title font-karla text-white">
            <div className="container mx-auto px-4 py-8 md:py-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Logo & Description */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full"></div>
                            <h2 className="text-xl md:text-2xl font-bold">Selectify</h2>
                        </div>
                        <p className="text-white/80 text-sm md:text-base">
                            Selectify is your one-stop platform for discovering, exploring, and selecting the best resources tailored to your needs.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-base md:text-lg font-semibold">Quick Links</h3>
                        <ul className="text-white/80 text-sm md:text-base space-y-2">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/recommendations" className="hover:text-white transition-colors">Recommendations</Link></li>
                            <li><Link to="/my-recommendations" className="hover:text-white transition-colors">My Recommendations</Link></li>
                            <li><Link to="/my-queries" className="hover:text-white transition-colors">My Queries</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-base md:text-lg font-semibold">Newsletter</h3>
                        <p className="text-white/80 text-sm md:text-base">
                            Subscribe to get the latest updates and offers.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="w-full px-4 py-2 rounded-md text-black focus:outline-none text-sm md:text-base" 
                            />
                            <button 
                                type="submit" 
                                className="w-full sm:w-auto px-6 py-2 bg-white text-banner-title rounded-md font-bold hover:bg-gray-100 transition-colors text-sm md:text-base"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-white/20 my-6 md:my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 text-xs md:text-sm text-white/80">
                    <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Selectify. All rights reserved.</p>
                    <div className="flex gap-3 md:gap-4">
                        <a 
                            href="https://facebook.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-banner-title transition-all duration-300"
                        >
                            <FaFacebookF className="text-sm md:text-base" />
                        </a>
                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-banner-title transition-all duration-300"
                        >
                            <FaLinkedinIn className="text-sm md:text-base" />
                        </a>
                        <a 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-banner-title transition-all duration-300"
                        >
                            <FaTwitter className="text-sm md:text-base" />
                        </a>
                        <a 
                            href="https://instagram.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-banner-title transition-all duration-300"
                        >
                            <FaInstagram className="text-sm md:text-base" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
