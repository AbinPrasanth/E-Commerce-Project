import React from 'react';


import { FaTruckFast, FaHeadset, FaMoneyCheck, FaFacebookF, FaXTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa6';


const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 text-gray-300 py-16 mt-10">
                <div className="container mx-auto px-4 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Golden Phoenix</h3>
                        <p>Your one-stop destination for trendy and comfortable footwear.</p>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="/contact" className="hover:text-orange-400">Contact Us</a></li>
                            <li><a href="/faq" className="hover:text-orange-400">FAQs</a></li>
                            <li><a href="/returns" className="hover:text-orange-400">Returns & Refunds</a></li>
                            <li><a href="/privacy" className="hover:text-orange-400">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Our Services</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <FaMoneyCheck className="text-orange-400" />
                                <span>Secure Payment</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaTruckFast className="text-orange-400" />
                                <span>Fast Delivery</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaHeadset className="text-orange-400" />
                                <span>24/7 Support</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Connect With Us</h4>
                        <div className="flex gap-5 text-2xl">
                            <a href="#" className="hover:text-orange-400"><FaFacebookF /></a>
                            <a href="#" className="hover:text-orange-400"><FaXTwitter /></a>
                            <a href="#" className="hover:text-orange-400"><FaInstagram /></a>
                            <a href="#" className="hover:text-orange-400"><FaWhatsapp /></a>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-10 text-sm border-t border-gray-700 pt-5">
                    <p>&copy; 2025 Golden Phoenix. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;