import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent"></div>
            
            <div className="relative z-10 py-16">
                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        <div className="lg:col-span-2">
                            <div className="flex flex-col h-full">
                                <div className="mb-8">
                                    <Link to="/" className="inline-block group">
                                        <div className="transform transition-transform duration-200 group-hover:scale-105">
                                            <Logo width="120px" />
                                        </div>
                                    </Link>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-md">
                                        Building the future of digital experiences with innovative design and cutting-edge technology.
                                    </p>
                                    <div className="flex space-x-4">
                                        {['twitter', 'github', 'linkedin'].map((social) => (
                                            <a key={social} href="#" className="group p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-200 hover:scale-110">
                                                <div className="w-5 h-5 bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <p className="text-sm text-gray-500">
                                        © 2025 DevUI. All rights reserved.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6 pb-2 border-b border-gray-700/50">
                                Company
                            </h3>
                            <ul className="space-y-4">
                                {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            className="group inline-flex items-center text-gray-300 hover:text-white transition-all duration-200 text-base"
                                            to="/"
                                        >
                                            <span className="relative">
                                                {item}
                                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                                            </span>
                                            <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6 pb-2 border-b border-gray-700/50">
                                Support
                            </h3>
                            <ul className="space-y-4">
                                {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            className="group inline-flex items-center text-gray-300 hover:text-white transition-all duration-200 text-base"
                                            to="/"
                                        >
                                            <span className="relative">
                                                {item}
                                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                                            </span>
                                            <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-700/50">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                                <Link to="/" className="hover:text-white transition-colors duration-200">Terms & Conditions</Link>
                                <Link to="/" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
                                <Link to="/" className="hover:text-white transition-colors duration-200">Licensing</Link>
                            </div>
                            <div className="text-sm text-gray-500">
                                Made with ❤️ in India
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer