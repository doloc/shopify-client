'use client'
import { useState } from "react";
import { FiEdit2, FiPlusCircle, FiTrash2 } from "react-icons/fi";

const News = () => {
  const [language] = useState<keyof typeof translations>("en");
    const [editNews, setEditNews] = useState<any>(null);
    const [isNewsEditModalOpen, setIsNewsEditModalOpen] = useState(false);
    const translations = {
        en: {
            actions: "Actions",
            news: "News/Blog",
            addNews: "Add New",
            status: "Status",
            edit: "Edit",
            save: "Save",
            cancel: "Cancel",
            title: "Title",
            author: "Author",
            publicationDate: "Publication Date",
            content: "Content",
            featuredImage: "Featured Image",
            preview: "Preview"
        },
        vi: {
            actions: "Hành động",
            news: "Tin tức/Blog",
            addNews: "Thêm mới",
            status: "Trang thái",
            edit: "Sửa",
            save: "Luu",
            cancel: "Huy",
            title: "Tiêu đề",
            author: "Tác giả",
            publicationDate: "Ngày xuất bản",
            content: "Nội dung",
            featuredImage: "Ảnh đại diện",
            preview: "Xem trước"
        }
    };

    const sampleNews = [
        {
          id: 1,
          title: "New Collection Launch",
          author: "John Doe",
          publicationDate: "2024-01-15",
          status: "Published",
          content: "Exciting new collection launch featuring modern designs...",
          featuredImage: "images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"
        },
        {
          id: 2,
          title: "Interior Design Trends 2024",
          author: "Jane Smith",
          publicationDate: "2024-01-10",
          status: "Draft",
          content: "Discover the latest interior design trends for 2024...",
          featuredImage: "images.unsplash.com/photo-1586023492125-27b2c045efd7"
        }
    ];
    
    const handleEditNews = (news: any) => {
        setEditNews(news);
        setIsNewsEditModalOpen(true);
    };
    
    const handleSaveNews = (e: any) => {
        e.preventDefault();
        setIsNewsEditModalOpen(false);
        setEditNews(null);
    };
    
    const handleDeleteNews = (newsId: number) => {
        // Handle delete functionality here
        console.log("Deleting news with ID:", newsId);
    };

    const NewsEditModal = () => (
        isNewsEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[800px]">
              <h3 className="text-xl font-bold mb-4">{translations[language].edit} News/Blog</h3>
              <form onSubmit={handleSaveNews} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{translations[language].title}</label>
                  <input
                    type="text"
                    value={editNews?.title || ""}
                    onChange={(e) => setEditNews({...editNews, title: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{translations[language].content}</label>
                  <textarea
                    value={editNews?.content || ""}
                    onChange={(e) => setEditNews({...editNews, content: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{translations[language].author}</label>
                    <input
                      type="text"
                      value={editNews?.author || ""}
                      onChange={(e) => setEditNews({...editNews, author: e.target.value})}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{translations[language].publicationDate}</label>
                    <input
                      type="date"
                      value={editNews?.publicationDate || ""}
                      onChange={(e) => setEditNews({...editNews, publicationDate: e.target.value})}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{translations[language].status}</label>
                  <select
                    value={editNews?.status || "Draft"}
                    onChange={(e) => setEditNews({...editNews, status: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsNewsEditModalOpen(false)}
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
                <h2 className="text-2xl font-bold">{translations[language].news}</h2>
                <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <FiPlusCircle className="mr-2" />
                    {translations[language].addNews}
                </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left">{translations[language].title}</th>
                    <th className="px-6 py-3 text-left">{translations[language].author}</th>
                    <th className="px-6 py-3 text-left">{translations[language].publicationDate}</th>
                    <th className="px-6 py-3 text-left">{translations[language].status}</th>
                    <th className="px-6 py-3 text-left">{translations[language].preview}</th>
                    <th className="px-6 py-3 text-left">{translations[language].actions}</th>
                  </tr>
                </thead>
                <tbody>
                    {sampleNews.map((news) => (
                        <tr key={news.id} className="border-b">
                        <td className="px-6 py-4">{news.title}</td>
                        <td className="px-6 py-4">{news.author}</td>
                        <td className="px-6 py-4">{news.publicationDate}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-sm ${news.status === "Published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                            {news.status}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <p className="truncate w-48">{news.content}</p>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex space-x-2">
                            <button
                                onClick={() => handleEditNews(news)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                            >
                                <FiEdit2 />
                            </button>
                            <button 
                                onClick={() => handleDeleteNews(news.id)}
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
            <NewsEditModal />
        </div>
    )
}

export default News