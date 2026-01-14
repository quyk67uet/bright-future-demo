import React, { useState } from "react";

interface SolarDataTableProps {
  title: string;
  column: string;
  unit: string;
}
export default function SolarDataTable({
  title,
  column,
  unit,
}: SolarDataTableProps) {
  const [viewType, setViewType] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Generate data từ ngày hiện tại (14/1/2026) - Sample data
  const generateDailyData = () => {
    const startDate = new Date('2026-01-14');
    const data = [];
    for (let i = 0; i < 13; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      // Giá trị hợp lý cho tháng 1 ở Việt Nam (mùa khô, ít mây)
      const baseIrradiation = 400 + Math.random() * 300; // 400-700 kWh/m2
      const irradiation = Math.round(baseIrradiation);
      const output = Math.round(irradiation * 0.08 + Math.random() * 10); // Tỷ lệ hợp lý
      const efficiency = 85 + Math.random() * 12; // 85-97%
      data.push({
        time: dateStr,
        irradiation,
        output,
        efficiency: Math.round(efficiency * 10) / 10,
      });
    }
    return data;
  };
  
  const dailyData = generateDailyData();

  // Monthly data cho năm 2026 - hợp lý với khí hậu Việt Nam
  const monthlyData = [
    { time: "January 2026", irradiation: 420, output: 34, efficiency: 92.5 },
    { time: "February 2026", irradiation: 480, output: 39, efficiency: 93.2 },
    { time: "March 2026", irradiation: 650, output: 55, efficiency: 95.1 },
    { time: "April 2026", irradiation: 720, output: 62, efficiency: 95.8 },
    { time: "May 2026", irradiation: 800, output: 70, efficiency: 96.2 },
    { time: "June 2026", irradiation: 850, output: 75, efficiency: 96.5 },
    { time: "July 2026", irradiation: 820, output: 72, efficiency: 96.3 },
    { time: "August 2026", irradiation: 780, output: 68, efficiency: 95.9 },
    { time: "September 2026", irradiation: 700, output: 60, efficiency: 95.4 },
    { time: "October 2026", irradiation: 600, output: 50, efficiency: 94.5 },
    { time: "November 2026", irradiation: 500, output: 42, efficiency: 93.8 },
    { time: "December 2026", irradiation: 450, output: 37, efficiency: 93.0 },
  ];

  const currentData = viewType === "daily" ? dailyData : monthlyData;

  const formatDate = (dateStr: any) => {
    if (viewType === "daily") {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
    }
    return dateStr;
  };

  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const paginatedData = currentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-purple-600 mb-4">{title}</h2>

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setViewType("daily")}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewType === "daily"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setViewType("monthly")}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewType === "monthly"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              Monthly
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by time..."
              className="px-4 py-2 border border-gray-300 rounded-md w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-700">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">☀</span>
                    Solar Irradiation
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">⚡</span>
                    Predicted Output
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">📊</span>
                    Efficiency
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-[16px] text-gray-700">
                    {formatDate(row.time)}
                  </td>
                  <td className="px-6 py-4 text-[16px] text-gray-700">
                    {row.irradiation} kWh/m2
                  </td>
                  <td className="px-6 py-4 text-[16px] text-gray-700">
                    {row.output} kWh
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${row.efficiency}%` }}
                        />
                      </div>
                      <span className="text-[16px] text-gray-700">
                        {row.efficiency}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[16px] text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              className={`px-4 py-2 text-[16px] rounded-md transition-colors ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-700"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className={`px-4 py-2 text-[16px] rounded-md transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-700"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
