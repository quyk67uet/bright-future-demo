"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Clock, Settings, AlertTriangle } from "lucide-react";

const FactorySuggestPage = () => {
  const [maintenanceSchedule] = useState([
    { date: "2024-11-15", type: "định kỳ", duration: "4h", impact: "Low" },
    {
      date: "2024-11-20",
      type: "phòng ngừa",
      duration: "8h",
      impact: "Medium",
    },
    { date: "2024-12-01", type: "quan trọng", duration: "24h", impact: "High" },
  ]);

  const efficiencyData = [
    { date: "10/11/2024", efficiency: 92, uptime: 98 },
    { date: "11/11/2024", efficiency: 89, uptime: 97 },
    { date: "12/11/2024", efficiency: 94, uptime: 99 },
  ];

  return (
    <div className="space-y-4">
      {/* Plant Efficiency Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Hiệu suất
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94%</div>
            <p className="text-xs text-gray-500">Mục tiêu: 95%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Thời gian hoạt động
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">99%</div>
            <p className="text-xs text-gray-500">Trong 24 giờ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Lần bảo chì tới
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3 days</div>
            <p className="text-xs text-gray-500">Kiểm tra định kỳ</p>
          </CardContent>
        </Card>
      </div>

      {/* Efficiency Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hiệu suất</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData}>
                <XAxis dataKey="date" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="uptime"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Lịch bảo trì
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {maintenanceSchedule.map((schedule, index) => (
              <div
                key={index}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">Bảo trì {schedule.type}</p>
                  <p className="text-sm text-gray-500">{schedule.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{schedule.duration}</p>
                  <p
                    className={`text-sm ${
                      schedule.impact === "High"
                        ? "text-red-500"
                        : schedule.impact === "Medium"
                        ? "text-orange-500"
                        : "text-green-500"
                    }`}
                  >
                    {schedule.impact} Impact
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FactorySuggestPage;
