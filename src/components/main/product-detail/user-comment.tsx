'use client'
import { translations } from "@/app/configuration/language";
import { languageState } from "@/components/atom/atom";
import { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
import { useRecoilValue } from "recoil";

const UserComments = () => {
    const language = useRecoilValue<string>(languageState);
    const [showStickyBar, setShowStickyBar] = useState(false);
    const [comments, setComments] = useState([
        {
          id: 1,
          user: {
            name: "John Doe",
            avatar: "images.unsplash.com/photo-1472099645785-5658abf4ff4e"
          },
          rating: 5,
          date: "2024-01-15",
          text: "Excellent product! The installation was straightforward and the quality is outstanding."
        },
        {
          id: 2,
          user: {
            name: "Jane Smith",
            avatar: "images.unsplash.com/photo-1438761681033-6461ffad8d80"
          },
          rating: 4,
          date: "2024-01-10",
          text: "Very satisfied with the purchase. The finish is beautiful and durable."
        }
    ]);
    
    const [commentSort, setCommentSort] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [newComment, setNewComment] = useState({ rating: 5, text: "" });
    const commentsPerPage = 5;

    useEffect(() => {
        const handleScroll = () => {
        setShowStickyBar(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const averageRating = comments.reduce((acc, curr) => acc + curr.rating, 0) / comments.length;

    const sortedComments = [...comments].sort((a, b) => {
        if (commentSort === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (commentSort === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
        if (commentSort === "highest") return b.rating - a.rating;
        return a.rating - b.rating;
    });

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = sortedComments.slice(indexOfFirstComment, indexOfLastComment);
    const totalPages = Math.ceil(comments.length / commentsPerPage);

    const handleCommentSubmit = (e: any) => {
        e.preventDefault();
        const newCommentObj = {
            id: comments.length + 1,
            user: {
            name: "Current User",
            avatar: "images.unsplash.com/photo-1519345182560-3f2917c472ef"
            },
            rating: newComment.rating,
            date: new Date().toISOString().split("T")[0],
            text: newComment.text
        };
        setComments([...comments, newCommentObj]);
        setNewComment({ rating: 5, text: "" });
    };
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mt-12 mb-20">
            <h2 className="text-2xl font-bold mb-6">{translations[language].reviews.title}</h2>
            <div className="flex items-center mb-6">
                <div className="flex items-center">
                <span className="text-3xl font-bold mr-2">{averageRating.toFixed(1)}</span>
                <div className="flex">
                    {[...Array(5)].map((_, index) => (
                    <FiStar
                        key={index}
                        className={`w-5 h-5 ${index < Math.round(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                    ))}
                </div>
                </div>
                <div className="ml-8">
                <select
                    value={commentSort}
                    onChange={(e) => setCommentSort(e.target.value)}
                    className="border rounded-md px-3 py-1"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                </select>
                </div>
            </div>

            <form onSubmit={handleCommentSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h3 className="font-semibold mb-4">{translations[language].reviews.review}</h3>
                <div className="mb-4">
                <label className="block mb-2">{translations[language].reviews.rating}</label>
                <div className="flex">
                    {[...Array(5)].map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setNewComment({ ...newComment, rating: index + 1 })}
                        className="mr-1"
                    >
                        <FiStar
                        className={`w-6 h-6 ${index < newComment.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                    </button>
                    ))}
                </div>
                </div>
                <div className="mb-4">
                <label className="block mb-2">{translations[language].reviews.comment}</label>
                <textarea
                    value={newComment.text}
                    onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                    className="w-full border rounded-md p-2 min-h-[100px]"
                    required
                />
                </div>
                <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-gold-600 transition-colors"
                >
                {translations[language].reviews.submit}
                </button>
            </form>

            <div className="space-y-6">
                {currentComments.map((comment) => (
                <div key={comment.id} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                    <img
                        src={`https://${comment.user.avatar}`}
                        alt={comment.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                        <h4 className="font-semibold">{comment.user.name}</h4>
                        <div className="flex items-center">
                        <div className="flex mr-2">
                            {[...Array(5)].map((_, index) => (
                            <FiStar
                                key={index}
                                className={`w-4 h-4 ${index < comment.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                            ))}
                        </div>
                        <span className="text-gray-500 text-sm">{comment.date}</span>
                        </div>
                    </div>
                    </div>
                    <p className="text-gray-600">{comment.text}</p>
                </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`mx-1 px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-gold-500 text-white" : "bg-gray-200"}`}
                    >
                    {index + 1}
                    </button>
                ))}
                </div>
            )}
            </div>

            {showStickyBar && (
            <div className="fixed bottom-0 left-0 right-0 bg-black text-white py-4 shadow-lg z-50">
                {/* Existing sticky bar content */}
            </div>
            )}
        </div>
    )
}

export default UserComments