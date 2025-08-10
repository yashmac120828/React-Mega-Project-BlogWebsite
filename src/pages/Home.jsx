import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/conf";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Container>
          <div className="py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-64 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Container>
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-2xl">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                  Welcome to Our Platform
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Discover amazing content from our community of writers and creators.
                </p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Started Today</h2>
                <p className="text-gray-600 mb-6">
                  Join our community to access exclusive content, share your thoughts, and connect with like-minded individuals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/login">
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-300 w-full sm:w-auto">
                      Create Account
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        
        <Container>
          <div className="relative py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                Latest Stories
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our curated collection of insights, tutorials, and stories from our community
              </p>
              <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post.$id} className="transform transition-all duration-300">
                  <PostCard {...post} />
                </div>
              ))}
            </div>

            {posts.length > 0 && (
              <div className="text-center mt-16">
                <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50 shadow-lg">
                  <span className="text-gray-600 font-medium">Showing {posts.length} posts</span>
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;