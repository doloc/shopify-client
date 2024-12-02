'use client'
import React, { useState } from "react";
import { FiSearch, FiUsers, FiGrid, FiImage, FiFileText, FiMenu, FiPlusCircle, FiEdit2, FiTrash2, FiSettings, FiDollarSign, FiPackage, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const metrics = [
        { title: "Total Users", value: "24,589", change: "+12.5%", icon: <FiUsers className="text-blue-500" size={24} /> },
        { title: "Total Products", value: "1,284", change: "+8.2%", icon: <FiPackage className="text-green-500" size={24} /> },
        { title: "Total Sales", value: "3,456", change: "-2.4%", icon: <FiTrendingUp className="text-purple-500" size={24} /> },
        { title: "Revenue", value: "$45,678", change: "+15.8%", icon: <FiDollarSign className="text-yellow-500" size={24} /> },
    ];

      const lineChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Sales",
            data: [65, 59, 80, 81, 56, 55],
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };

    const barChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Revenue",
            data: [4500, 5900, 8000, 8100, 5600, 5500],
            backgroundColor: "rgba(153, 102, 255, 0.5)",
          },
        ],
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
          
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">{metric.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                    <p className={`text-sm mt-2 ${metric.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                      {metric.change} from last month
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-full">{metric.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
              <Line data={lineChartData} options={{ responsive: true }} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Revenue Analysis</h3>
              <Bar data={barChartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
    );
}

export default AdminDashboard