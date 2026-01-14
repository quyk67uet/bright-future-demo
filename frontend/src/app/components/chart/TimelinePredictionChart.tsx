"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TimelinePredictionChart = ({ title }: { title: string }) => {
  // Generate hourly data - hợp lý với chu kỳ mặt trời (cao nhất vào giữa trưa)
  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    // Mô phỏng đường cong năng lượng mặt trời: thấp vào sáng sớm/tối, cao vào giữa trưa
    const hour = i;
    let value = 0;
    if (hour >= 6 && hour <= 18) {
      // Giờ có nắng (6h-18h)
      const peakHour = 12; // Giữa trưa
      const distanceFromPeak = Math.abs(hour - peakHour);
      value = Math.max(0, 200 - distanceFromPeak * 15 + Math.random() * 30);
    }
    return {
      time: `${String(hour).padStart(2, '0')}:00`,
      savings: Math.round(value),
    };
  });

  // Daily data - 7 ngày từ 14/1/2026
  const startDate = new Date('2026-01-14');
  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      time: dayNames[date.getDay()],
      savings: Math.round(600 + Math.random() * 200), // 600-800 kWh
    };
  });

  // Yearly data - 12 tháng năm 2026
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const yearlyData = Array.from({ length: 12 }, (_, i) => {
    // Mùa hè (tháng 4-9) có năng lượng cao hơn
    const isSummer = i >= 3 && i <= 8;
    const baseValue = isSummer ? 2500 : 1800;
    return {
      time: monthNames[i],
      savings: Math.round(baseValue + Math.random() * 400),
    };
  });

  const [timeframe, setTimeframe] = useState("daily");
  const [data, setData] = useState(dailyData);

  const handleTimeframeChange = (
    newTimeframe: React.SetStateAction<string>
  ) => {
    setTimeframe(newTimeframe);
    switch (newTimeframe) {
      case "hourly":
        setData(hourlyData);
        break;
      case "daily":
        setData(dailyData);
        break;
      case "yearly":
        setData(yearlyData);
        break;
    }
  };

  return (
    <Card className="w-full my-[15px] max-w-4xl bg-white shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-purple-800"></CardTitle>
          <div className="flex gap-2">
            <Button
              variant={timeframe === "hourly" ? "default" : "outline"}
              onClick={() => handleTimeframeChange("hourly")}
              className="text-sm"
            >
              Hourly
            </Button>
            <Button
              variant={timeframe === "daily" ? "default" : "outline"}
              onClick={() => handleTimeframeChange("daily")}
              className="text-sm"
            >
              Daily
            </Button>
            <Button
              variant={timeframe === "yearly" ? "default" : "outline"}
              onClick={() => handleTimeframeChange("yearly")}
              className="text-sm"
            >
              Yearly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="time"
                stroke="#666"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#666"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => [`$${value}`, "Predicted Savings"]}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <h1 className="font-bold text-gray-600 mt-4 text-center">{title}</h1>
      </CardContent>
    </Card>
  );
};

export default TimelinePredictionChart;
