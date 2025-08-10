import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
                setIsLoading(false);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        setIsDeleting(true);
        try {
            const status = await appwriteService.deletePost(post.$id);
            if (status) {
                await appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" style={{animationDelay: '0.15s'}}></div>
                </div>
            </div>
        );
    }

    return post ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                
                <Container>
                    <article className="relative py-12">
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-8">
                                <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                                    <Link to="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Post</span>
                                </nav>
                                
                                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight mb-6">
                                    {post.title}
                                </h1>
                                
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center space-x-4 text-gray-600">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <span className="font-medium">Author</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm">5 min read</span>
                                        </div>
                                    </div>
                                    
                                    {isAuthor && (
                                        <div className="flex items-center space-x-3">
                                            <Link to={`/edit-post/${post.$id}`}>
                                                <Button 
                                                    variant="secondary"
                                                    size="sm"
                                                    className="flex items-center space-x-2"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    <span>Edit</span>
                                                </Button>
                                            </Link>
                                            <Button 
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center space-x-2 border-red-200 text-red-600 hover:bg-red-500 hover:text-white hover:border-red-500"
                                                onClick={deletePost}
                                                disabled={isDeleting}
                                            >
                                                {isDeleting ? (
                                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                                ) : (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                )}
                                                <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="relative mb-12 group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-gray-200/50">
                                    <img
                                        src={appwriteService.getFilePreview(post.featuredImage)}
                                        alt={post.title}
                                        className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                                </div>
                            </div>

                            <div className="prose prose-lg prose-blue max-w-none">
                                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200/50">
                                    <div className="text-gray-800 leading-relaxed space-y-6">
                                        {parse(post.content)}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <Link 
                                        to="/"
                                        className="group inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                    >
                                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        <span>Back to all posts</span>
                                    </Link>
                                    
                                    <div className="flex items-center space-x-4">
                                        <button className="group p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-white/80 transition-all duration-200 hover:scale-110">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                        <button className="group p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-white/80 transition-all duration-200 hover:scale-110">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </Container>
            </div>
        </div>
    ) : null;
}