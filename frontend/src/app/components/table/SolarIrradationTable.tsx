import React, { useState } from "react";

interface SolarDataTableProps {
  title: string;
  column: string;
  unit: string;
  startDate?: string; // YYYY-MM-DD, defaults to today
}
export default function SolarDataTable({
  title,
  column,
  unit,
  startDate,
}: SolarDataTableProps) {
  const [viewType, setViewType] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Generate data từ ngày bắt đầu người dùng gửi form
  const generateDailyData = () => {
    const base = startDate ? new Date(startDate) : new Date();
    const data = [];
    for (let i = 0; i < 13; i++) {
      const date = new Date(base);
      date.setDate(base.getDate() + i);
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
  const monthlyData = (() => {
    const base = startDate ? new Date(startDate) : new Date();
    const year = base.getFullYear();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const seasonal = [420, 480, 650, 720, 800, 850, 820, 780, 700, 600, 500, 450];
    return monthNames.map((name, idx) => ({
      time: `${name} ${year}`,
      irradiation: seasonal[idx],
      output: Math.round(seasonal[idx] * 0.08),
      efficiency: 92 + Math.random() * 5,
    }));
  })();

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
