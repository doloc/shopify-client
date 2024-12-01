'use client'
import { useState } from "react";

const EditUser = () => {
    const [language, setLanguage] = useState<keyof typeof translations>("en");
    const [userProfile, setUserProfile] = useState({
        name: "Admin User",
        email: "admin@example.com",
        role: "Admin",
        phone: "+1234567890",
        address: "123 Admin Street"
    });
    
    const sampleOrders = [
        {
          id: "ORD001",
          date: "2024-01-15",
          amount: 299.99,
          status: "Completed"
        },
        {
          id: "ORD002",
          date: "2024-01-10",
          amount: 599.99,
          status: "Processing"
        }
    ];
    const translations = {
        en: {
            account: "Account Management",
        },
        vi: {
            account: "Account Management",
        }
    };
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">{translations[language].account}</h2>
            
            {/* Profile Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    value={userProfile.address}
                    onChange={(e) => setUserProfile({...userProfile, address: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Update Profile
              </button>
            </div>

            {/* Order History */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Order History</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-6 py-3 text-left">Order ID</th>
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left">Amount</th>
                      <th className="px-6 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="px-6 py-4">{order.id}</td>
                        <td className="px-6 py-4">{order.date}</td>
                        <td className="px-6 py-4">${order.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            order.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Role Management (Admin Only) */}
            {userProfile.role === "Admin" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Role Management</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600 mb-4">Manage user roles and permissions</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Manage Roles
                  </button>
                </div>
              </div>
            )}
        </div>
    )
}

export default EditUser