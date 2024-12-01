'use client'
import { useState } from "react";
import { FiSearch } from "react-icons/fi"

const Header = () => {
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
        <div className="flex justify-between items-center mb-8">
            <div className="relative">
                <input
                type="text"
                placeholder={translations[language].search}
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button
                onClick={() => setLanguage(language === "en" ? "vi" : "en")}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium"
            >
                {language.toUpperCase()}
            </button>
        </div>
    )
}

export default Header