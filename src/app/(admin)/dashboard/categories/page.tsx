'use client'
import { useState } from "react";
import { FiEdit2, FiPlusCircle, FiTrash2 } from "react-icons/fi";

const Categories = () => {
    const [language] = useState<keyof typeof translations>("en");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<any>(null);
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

    const sampleCategories = [
        {
          id: 1,
          name: "Kitchen",
          description: "Kitchen furniture and accessories",
          status: "Active"
        },
        {
          id: 2,
          name: "Bathroom",
          description: "Bathroom fixtures and accessories",
          status: "Active"
        },
        {
          id: 3,
          name: "Living Room",
          description: "Living room furniture and decor",
          status: "Inactive"
        }
    ];

    const handleEditCategory = (category: any) => {
        setEditCategory(category);
        setIsEditModalOpen(true);
    };
    
    const handleSaveCategory = (e: any) => {
        e.preventDefault();
        setIsEditModalOpen(false);
        setEditCategory(null);
    };

    const CategoryEditModal = () => (
        isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-xl font-bold mb-4">{translations[language].edit} {translations[language].categories}</h3>
              <form onSubmit={handleSaveCategory}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">{translations[language].categoryName}</label>
                  <input
                    type="text"
                    value={editCategory?.name || ""}
                    onChange={(e) => setEditCategory({...editCategory, name: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">{translations[language].description}</label>
                  <textarea
                    value={editCategory?.description || ""}
                    onChange={(e) => setEditCategory({...editCategory, description: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    {translations[language].cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {translations[language].save}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
    );
    
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{translations[language].categories}</h2>
                <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <FiPlusCircle className="mr-2" />
                    {translations[language].addNew}
                </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left">{translations[language].categoryName}</th>
                    <th className="px-6 py-3 text-left">{translations[language].description}</th>
                    <th className="px-6 py-3 text-left">{translations[language].status}</th>
                    <th className="px-6 py-3 text-left">{translations[language].actions}</th>
                  </tr>
                </thead>
                <tbody>
                    {sampleCategories.map((category) => (
                        <tr key={category.id} className="border-b">
                        <td className="px-6 py-4">{category.name}</td>
                        <td className="px-6 py-4">{category.description}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-sm ${category.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                            {category.status}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex space-x-2">
                            <button
                                onClick={() => handleEditCategory(category)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                            >
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
            <CategoryEditModal />
        </div>
    )
}

export default Categories