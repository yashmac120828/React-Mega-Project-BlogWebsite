import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                        {post ? 'Update Your Post' : 'Create New Post'}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {post ? 'Make changes to your existing post and publish updates.' : 'Share your thoughts and ideas with the world through a beautifully crafted post.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
                                Post Details
                            </h2>
                            
                            <div className="space-y-6">
                                <Input
                                    label="Title"
                                    placeholder="Enter your post title..."
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    {...register("title", { required: true })}
                                />
                                
                                <Input
                                    label="Slug"
                                    placeholder="post-url-slug"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    {...register("slug", { required: true })}
                                    onInput={(e) => {
                                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full mr-3"></div>
                                Content
                            </h2>
                            <RTE 
                                label="Write your content" 
                                name="content" 
                                control={control} 
                                defaultValue={getValues("content")} 
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
                                Media & Settings
                            </h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Featured Image
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/png, image/jpg, image/jpeg, image/gif"
                                            {...register("image", { required: !post })}
                                            id="image-upload"
                                        />
                                        <label 
                                            htmlFor="image-upload"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200 group-hover:border-blue-400"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG, JPEG or GIF</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {post && (
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <img
                                            src={appwriteService.getFilePreview(post.featuredImage)}
                                            alt={post.title}
                                            className="relative w-full h-48 object-cover rounded-xl border border-gray-200 shadow-sm"
                                        />
                                        <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-lg text-xs backdrop-blur-sm">
                                            Current Image
                                        </div>
                                    </div>
                                )}

                                <Select
                                    options={["active", "inactive"]}
                                    label="Publication Status"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    {...register("status", { required: true })}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
                            <Button 
                                type="submit" 
                                className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
                                    post 
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-green-500/25 hover:shadow-green-500/40' 
                                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-blue-500/25 hover:shadow-blue-500/40'
                                }`}
                            >
                                <span className="flex items-center justify-center space-x-2">
                                    {post ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            <span>Update Post</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span>Publish Post</span>
                                        </>
                                    )}
                                </span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}