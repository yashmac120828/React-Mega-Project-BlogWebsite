import React from 'react'

function Logo({ width = '100px', logoUrl = '' }) {
    return (
        <div className="flex items-center justify-center group" style={{ width }}>
            <div className="relative">
                {logoUrl ? (
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <img 
                                src={logoUrl} 
                                alt="MacFlix Logo" 
                                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg text-black"
                            />
                            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                                MacFlix
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-xl transform rotate-12 group-hover:rotate-0 transition-transform duration-300 shadow-lg"></div>
                            <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-xl transform -rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-60"></div>
                            <div className="absolute inset-2 w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                                <span className="text-xs font-bold bg-gradient-to-br from-pink-600 to-blue-600 bg-clip-text text-transparent">M</span>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                                MacFlix
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Logo