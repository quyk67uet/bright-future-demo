"use client";
import React, { useState } from "react";
import {
  Download,
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  Clock,
  FileText,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const History = () => {
  // Sample prediction data
  const [predictions] = useState([
    {
      id: 1,
      date: "2024-03-15",
      time: "14:30",
      location: "Pin loại A",
      efficiency: 87,
      powerOutput: 12.5,
      savings: 450,
      details: [
        { hour: "06:00", output: 2 },
        { hour: "09:00", output: 8 },
        { hour: "12:00", output: 12.5 },
        { hour: "15:00", output: 10 },
        { hour: "18:00", output: 4 },
      ],
    },
    {
      id: 2,
      date: "2024-03-14",
      time: "15:45",
      location: "Pin loại B",
      efficiency: 92,
      powerOutput: 14.2,
      savings: 520,
      details: [
        { hour: "06:00", output: 3 },
        { hour: "09:00", output: 9 },
        { hour: "12:00", output: 14.2 },
        { hour: "15:00", output: 11 },
        { hour: "18:00", output: 5 },
      ],
    },
  ]);

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState("date"); // 'date', 'location'

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDownload = (id: number, format: string) => {
    // Simulate download - in real app, this would trigger actual file download
    console.log(`Downloading prediction ${id} in ${format} format`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Prediction History
        </h1>
        <p className="text-gray-600">
          View and analyze your historical solar energy predictions
        </p>
      </div>

      {/* Filter Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-purple-600" />
              <span className="font-medium">Sort by:</span>
            </div>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  filterType === "date"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setFilterType("date")}
              >
                Date
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  filterType === "location"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setFilterType("location")}
              >
                Location
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictions List */}
      <div className="space-y-6">
        {predictions.map((prediction) => (
          <Card key={prediction.id} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Summary Row */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpand(prediction.id)}
              >
                <div className="flex flex-wrap items-center justify-between">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <span>{prediction.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <span>{prediction.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <span>{prediction.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <span>${prediction.savings} saved</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(prediction.id, "pdf");
                        }}
                        className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors flex items-center space-x-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>PDF</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(prediction.id, "csv");
                        }}
                        className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors flex items-center space-x-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>CSV</span>
                      </button>
                    </div>
                    {expandedId === prediction.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === prediction.id && (
                <div className="border-t border-gray-200 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm text-gray-600">
                            Efficiency
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            {prediction.efficiency}%
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm text-gray-600">
                            Power Output
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            {prediction.powerOutput} kW
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Chart */}
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={prediction.details}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="output"
                            stroke="#7C3AED"
                            name="Power Output (kW)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default History;
