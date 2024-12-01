'use client'
import { useState } from "react";
import { FiEdit2, FiPlusCircle, FiTrash2 } from "react-icons/fi";

const Navigation = () => {
    const [language, setLanguage] = useState<keyof typeof translations>("en");
    const [isNavigatorModalOpen, setIsNavigatorModalOpen] = useState(false);
    const [editNavigator, setEditNavigator] = useState<any>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
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
            cancel: "Cancel",
            title: "Title",
            author: "Author",
            publicationDate: "Publication Date",
            featuredImage: "Featured Image",
            preview: "Preview",
            link: "Link",
            confirmDelete: "Are you sure you want to delete this item?",
            yes: "Yes",
            no: "No"
        },
        vi: {
            dashboard: "Bảng điều khiển",
            products: "Sản phẩm",
            categories: "Danh mucch",
            banners: "Banner",
            users: "Người dùng",
            content: "Nội dung",
            news: "Tin tức/Blog",
            navigation: "Điều hướng",
            addNew: "Them moi",
            edit: "Sửa",
            delete: "Xoa",
            search: "Tim kiem...",
            categoryName: "Ten danh muc",
            description: "Mieu ta",
            status: "Trang thai",
            actions: "Hanh dong",
            save: "Luu",
            cancel: "Huy",
            title: "Tiêu đề",
            author: "Tác giả",
            publicationDate: "Ngày xuất bản",
            featuredImage: "Ảnh đại diện",
            preview: "Xem trước",
            link: "Liên kết",
            confirmDelete: "Bạn chắc chắn muốn xóa?",
            yes: "Có",
            no: "Không"
        }
    };

    const sampleNavigators = [
        {
            id: 1,
            title: "Home",
            link: "/home",
            status: "Active",
            image: "images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"
        },
        {
            id: 2,
            title: "Products",
            link: "/products",
            status: "Inactive",
            image: "images.unsplash.com/photo-1586023492125-27b2c045efd7"
        }
    ];

    const handleEditNavigator = (navigator: any) => {
        setEditNavigator(navigator);
        setIsNavigatorModalOpen(true);
    };
    
    const handleSaveNavigator = (e: any) => {
        e.preventDefault();
        setIsNavigatorModalOpen(false);
        setEditNavigator(null);
    };
    
    const handleDeleteNavigator = (id: number) => {
        setDeleteItemId(id);
        setShowDeleteConfirm(true);
    };
    
    const confirmDelete = () => {
        // Handle delete functionality here
        console.log("Deleting navigator with ID:", deleteItemId);
        setShowDeleteConfirm(false);
        setDeleteItemId(null);
    };

    const NavigatorModal = () => (
        isNavigatorModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[600px]">
              <h3 className="text-xl font-bold mb-4">
                {editNavigator ? translations[language].edit : translations[language].addNew} Navigator
              </h3>
              <form onSubmit={handleSaveNavigator} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{translations[language].featuredImage}</label>
                  <div className="flex items-center space-x-4">
                    <img
                      src={editNavigator?.image || "images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <input
                      type="file"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      accept="image/*"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{translations[language].title}</label>
                  <input
                    type="text"
                    value={editNavigator?.title || ""}
                    onChange={(e) => setEditNavigator({...editNavigator, title: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{translations[language].link}</label>
                  <input
                    type="text"
                    value={editNavigator?.link || ""}
                    onChange={(e) => setEditNavigator({...editNavigator, link: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{translations[language].status}</label>
                  <select
                    value={editNavigator?.status || "Inactive"}
                    onChange={(e) => setEditNavigator({...editNavigator, status: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsNavigatorModalOpen(false)}
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

    const DeleteConfirmationModal = () => (
        showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[400px]">
              <h3 className="text-xl font-bold mb-4">{translations[language].confirmDelete}</h3>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  {translations[language].no}
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  {translations[language].yes}
                </button>
              </div>
            </div>
          </div>
        )
    );

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{translations[language].navigation}</h2>
              <button 
                onClick={() => {
                  setEditNavigator(null);
                  setIsNavigatorModalOpen(true);
                }}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <FiPlusCircle className="mr-2" />
                {translations[language].addNew}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left">{translations[language].preview}</th>
                    <th className="px-6 py-3 text-left">{translations[language].title}</th>
                    <th className="px-6 py-3 text-left">{translations[language].link}</th>
                    <th className="px-6 py-3 text-left">{translations[language].status}</th>
                    <th className="px-6 py-3 text-left">{translations[language].actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleNavigators.map((nav) => (
                    <tr key={nav.id} className="border-b">
                      <td className="px-6 py-4">
                        <img
                          src={nav.image}
                          alt={nav.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4">{nav.title}</td>
                      <td className="px-6 py-4">{nav.link}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${nav.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                          {nav.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditNavigator(nav)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            onClick={() => handleDeleteNavigator(nav.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <NavigatorModal />
            <DeleteConfirmationModal />
        </div>
    )
}

export default Navigation