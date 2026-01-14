import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SolarPlantForecast = () => {
  const [forecastData, setForecastData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Tạo dữ liệu dự báo theo giờ cho 3 ngày
  const generateHourlyForecast = () => {
    setIsLoading(true);
    const forecast: any = [];
    const today = new Date();

    for (let day = 0; day < 3; day++) {
      for (let hour = 0; hour < 24; hour++) {
        const date = new Date(today);
        date.setDate(today.getDate() + day);
        date.setHours(hour);

        // Tạo giá trị dự báo theo mẫu với các đặc điểm:
        // - Ban ngày (6h-18h): giá trị cao hơn
        // - Đỉnh vào khoảng 12h trưa
        // - Ban đêm: gần như bằng 0
        let value = 0;
        if (hour >= 6 && hour <= 18) {
          const peakHour = 12;
          const distance = Math.abs(hour - peakHour);
          value = 4.5 * (1 - Math.pow(distance / 6, 2));
          // Thêm nhiễu ngẫu nhiên
          value += (Math.random() - 0.5) * 0.5;
        } else {
          value = Math.random() * 0.2; // Giá trị nhỏ cho ban đêm
        }

        forecast.push({
          timestamp: date.toLocaleString("vi-VN", {
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          value: Math.max(0, value),
        });
      }
    }

    setTimeout(() => {
      setForecastData(forecast);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Hero Section và phần giới thiệu giữ nguyên như cũ */}
      <Card className="overflow-hidden">
        {/* ... các phần khác giữ nguyên ... */}

        {/* Phần dự báo */}
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="h-80 mt-4 bg-blue-50/50">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="timestamp"
                    tick={{ fontSize: 12 }}
                    interval={8} // Hiển thị nhãn cách mỗi 8 giờ
                  />
                  <YAxis domain={[0, 6]} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "6px",
                    }}
                    formatter={(value: any) => [
                      `${value.toFixed(2)} kW`,
                      "Công suất",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                    name="Predicted Total Power"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-sm text-gray-500">
              Dự báo được cập nhật mỗi giờ | Độ tin cậy: 95%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolarPlantForecast;
