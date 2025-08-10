import React from 'react'
import appwriteService from "../appwrite/conf"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  // console.log(featuredImage);
  // console.log(appwriteService.getFilePreview(featuredImage));
  
    return (
        <Link to={`/post/${$id}`} className="group block">
            <article className="relative bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative overflow-hidden">
                    <div className="aspect-video w-full">
                        <img 
                            src={appwriteService.getFilePreview(featuredImage)} 
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-start justify-between">
                        <h2 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                            {title}
                        </h2>
                    </div>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>Read more</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>5 min read</span>
                        </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">Author</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
                                <span className="text-sm">View post</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default PostCard