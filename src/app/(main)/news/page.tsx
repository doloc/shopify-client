'use client'
import { translations } from "@/app/configuration/language";
import { languageState } from "@/components/atom/atom";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRecoilValue } from "recoil";

const NewsPage = () => {
    const language = useRecoilValue<string>(languageState);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const itemsPerPage = 6;

    const articles = [
    {
        title: "Modern Interior Design Trends 2024",
        description: "Discover the latest trends in interior design and home decoration for the upcoming year.",
        date: "January 15, 2024",
        image: "images.unsplash.com/photo-1616486338812-3dadae4b4ace",
        category: "design",
        views: 1500
    },
    {
        title: "Sustainable Furniture Solutions",
        description: "Learn about eco-friendly furniture options and how to make sustainable choices for your home.",
        date: "January 12, 2024",
        image: "images.unsplash.com/photo-1618221195710-dd6b41faaea6",
        category: "sustainability",
        views: 1200
    },
    {
        title: "Smart Home Integration Guide",
        description: "Everything you need to know about integrating smart technology into your home furniture.",
        date: "January 10, 2024",
        image: "images.unsplash.com/photo-1584622650111-993a426fbf0a",
        category: "technology",
        views: 2000
    }]

    const filterArticles = () => {
        let filtered = articles;

        if (searchQuery) {
        filtered = filtered.filter(article =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        }

        if (selectedCategory !== "all") {
        filtered = filtered.filter(article => article.category === selectedCategory);
        }

        switch (sortBy) {
            case "oldest":
                filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                break;
            case "popular":
                filtered.sort((a, b) => b.views - a.views);
                break;
            default: // "newest"
                filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }

        return filtered;
    };

    const filteredArticles = filterArticles();
    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
    const displayedArticles = filteredArticles.slice(0, currentPage * itemsPerPage);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">{translations[language].news.title}</h1>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                type="text"
                placeholder={translations[language].searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex flex-wrap gap-4">
                <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                >
                {Object.entries(translations[language].categories).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
                </select>

                <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                >
                {Object.entries(translations[language].news.sorting).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
                </select>
            </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((article, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative pb-[60%] overflow-hidden">
                    <img
                    src={`https://${article.image}`}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-500">{article.date}</p>
                    <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {article.category}
                    </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.description}</p>
                    <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    {translations[language].news.readMore} →
                    </button>
                </div>
                </div>
            ))}
            </div>

            {/* Load More Button */}
            {currentPage < totalPages && (
            <div className="text-center mt-8">
                <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                Load More
                </button>
            </div>
            )}
        </div>
        </div>
    );
};

export default NewsPage;
