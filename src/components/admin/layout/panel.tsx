'use client'
import { useState } from "react";
import { FiFileText, FiGrid, FiImage, FiMenu, FiSettings, FiUsers } from "react-icons/fi"

const Panel = () => {
    type SectionKeys = keyof typeof translations["en"];
    const [activeSection, setActiveSection] = useState<SectionKeys>("products");
    const [language, setLanguage] = useState<keyof typeof translations>("en");

    const translations = {
        en: {
            dashboard: "Dashboard",
            products: "Products",
            categories: "Categories",
            banners: "Banners",
            users: "Users",
            content: "Content",
            news: "News/Blog",
            navigation: "Navigation",
            addNew: "Add New",
            edit: "Edit",
            delete: "Delete",
            search: "Search..."
        },
        vi: {
            dashboard: "Bảng điều khiển",
            products: "Sản phẩm",
            categories: "Danh mục",
            banners: "Banner",
            users: "Người dùng",
            content: "Nội dung",
            news: "Tin tức/Blog",
            navigation: "Điều hướng",
            addNew: "Thêm mới",
            edit: "Sửa",
            delete: "Xóa",
            search: "Tìm kiếm..."
        }
    };

    return (
        <div className="w-64 bg-white shadow-lg">
            <div className="p-6">
            <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
            <nav className="space-y-2">
                <button
                    onClick={() => setActiveSection("products")}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg ${activeSection === "products" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                >
                    <FiGrid />
                    <span>{translations[language].products}</span>
                </button>
                <button
                    onClick={() => setActiveSection("categories")}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg ${activeSection === "categories" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                    >
                    <FiMenu />
                    <span>{translations[language].categories}</span>
                </button>
                <button
                    onClick={() => setActiveSection("banners")}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg ${activeSection === "banners" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                    >
                    <FiImage />
                    <span>{translations[language].banners}</span>
                </button>
                <button
                    onClick={() => setActiveSection("users")}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg ${activeSection === "users" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                    >
                    <FiUsers />
                    <span>{translations[language].users}</span>
                </button>
                <button
                    onClick={() => setActiveSection("news")}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
                        activeSection === "news" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                    }`}
                    >
                    <FiFileText />
                    <span>{translations[language].news}</span>
                </button>
                <button
                    onClick={() => setActiveSection("navigation")}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
                        activeSection === "navigation" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                    }`}
                    >
                    <FiSettings />
                    <span>{translations[language].navigation}</span>
                </button>
            </nav>
        </div>
      </div>
    )
}

export default Panel