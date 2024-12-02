'use client'
import { useState } from "react";
import { FiEdit2, FiPlusCircle, FiTrash2 } from "react-icons/fi";

const Users = () => {
    const [language] = useState<keyof typeof translations>("en");
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
          search: "Search...",
          categoryName: "Category Name",
          description: "Description",
          status: "Status",
          actions: "Actions",
          save: "Save",
          cancel: "Cancel"
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
          search: "Tìm kiếm...",
          categoryName: "Tên danh mục",
          description: "Mô tả",
          status: "Trạng thái",
          actions: "Hành động",
          save: "Lưu",
          cancel: "Hủy"
        }
    };
    const sampleUsers = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "Admin"
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "Editor"
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{translations[language].users}</h2>
                <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <FiPlusCircle className="mr-2" />
                    {translations[language].addNew}
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Role</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sampleUsers.map((user) => (
                        <tr key={user.id} className="border-b">
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4">
                            <div className="flex space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                                <FiEdit2 />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                                <FiTrash2 />
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>    
    );
}

export default Users