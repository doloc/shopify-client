'use client'
import { useState } from "react";
import { FiEdit2, FiPlusCircle, FiTrash2 } from "react-icons/fi"

const Products = () => {
    const [language, setLanguage] = useState<keyof typeof translations>("en");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const translations = {
        en: {
            products: "Products",
            addNew: "Add New",
        },
        vi: {
            products: "Sản phẩm",
            addNew: "Thêm mới",
        }
    };

    const sampleProducts = [
        {
            id: 1,
            name: "Modern Kitchen Faucet",
            price: 299.99,
            category: "Kitchen",
            image: "images.unsplash.com/photo-1584622650111-993a426fbf0a",
            status: "public",
            quantity: 50
        },
        {
            id: 2,
            name: "Luxury Bathroom Vanity",
            price: 899.99,
            category: "Bathroom",
            image: "images.unsplash.com/photo-1620626011761-996317b8d101",
            status: "private",
            quantity: 25
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{translations[language].products}</h2>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <FiPlusCircle className="mr-2" />
                {translations[language].addNew}
              </button>
            </div>

            <div className="flex gap-4 flex-wrap">
              <div className="flex gap-2">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-3 py-1 rounded-full text-sm ${statusFilter === "all" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                >
                  All Status
                </button>
                <button
                  onClick={() => setStatusFilter("public")}
                  className={`px-3 py-1 rounded-full text-sm ${statusFilter === "public" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                >
                  Public
                </button>
                <button
                  onClick={() => setStatusFilter("private")}
                  className={`px-3 py-1 rounded-full text-sm ${statusFilter === "private" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}
                >
                  Private
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCategoryFilter("all")}
                  className={`px-3 py-1 rounded-full text-sm ${categoryFilter === "all" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                >
                  All Categories
                </button>
                <button
                  onClick={() => setCategoryFilter("Kitchen")}
                  className={`px-3 py-1 rounded-full text-sm ${categoryFilter === "Kitchen" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"}`}
                >
                  Kitchen
                </button>
                <button
                  onClick={() => setCategoryFilter("Bathroom")}
                  className={`px-3 py-1 rounded-full text-sm ${categoryFilter === "Bathroom" ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800"}`}
                >
                  Bathroom
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left">Image</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Quantity</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleProducts
                    .filter(product => {
                      if (statusFilter === "all" && categoryFilter === "all") return true;
                      if (statusFilter === "all") return product.category === categoryFilter;
                      if (categoryFilter === "all") return product.status === statusFilter;
                      return product.status === statusFilter && product.category === categoryFilter;
                    })
                    .map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="px-6 py-4">
                        <img
                          src={`https://${product.image}`}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">${product.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${product.status === 'public' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${product.quantity <= 30 ? 'text-red-600' : 'text-gray-900'}`}>
                          {product.quantity}
                        </span>
                      </td>
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
    )
}

export default Products