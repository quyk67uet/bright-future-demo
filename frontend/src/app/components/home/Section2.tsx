import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Home, Battery, PiggyBank } from "lucide-react";

const Section2 = () => {
  const steps = [
    {
      icon: <Sun className="w-12 h-12 text-yellow-400" />,
      number: "1",
      title: "Dự đoán sản lượng năng lượng mặt trời",
      description:
        "Sử dụng dữ liệu từ các tấm pin, dữ liệu về thời tiết và dữ liệu về địa lý để dự đoán sản lượng năng lượng mặt trời cho từng mái nhà, khu vực",
    },
    {
      icon: <Battery className="w-12 h-12 text-green-500" />,
      number: "2",
      title: "Tư vấn lắp đặt hiệu quả",
      description:
        "Tính toán chi phí lắp đặt, tiết kiệm năng lượng và giảm lượng khí thải CO2, đồng thời cung cấp thông tin về các chương trình khuyến mãi và hỗ trợ tài chính",
    },
    {
      icon: <PiggyBank className="w-12 h-12 text-pink-500" />,
      number: "3",
      title: "Theo dõi & phân tích dữ liệu lịch sử",
      description:
        "Theo dõi sản lượng năng lượng mặt trời, tiết kiệm năng lượng và giảm lượng khí thải CO2 theo thời gian",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Cách dự án hoạt động</h1>
        <p className="text-gray-600">
          Sử dụng mô hình AI và dữ liệu thời tiết để đưa ra dự đoán chính xác
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Section2;
