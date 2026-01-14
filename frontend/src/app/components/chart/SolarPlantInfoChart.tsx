import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sun } from "lucide-react";

const SolarPlantInfo = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="overflow-hidden">
        {/* Hero Image Section */}
        <div className="relative h-96 bg-gradient-to-br from-orange-400 to-yellow-300">
          <img
            src="/api/placeholder/1200/600"
            alt="Nhà máy điện mặt trời tại Việt Nam"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" /> {/* Overlay */}
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex items-center gap-3">
              <Sun className="h-8 w-8 text-yellow-400" />
              <h1 className="text-3xl font-bold text-white">
                Nhà Máy Điện Mặt Trời
              </h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Thông tin chung
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Vị trí:</span>
                  <span>Ninh Thuận, Việt Nam</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Công suất:</span>
                  <span>450 MWp</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Diện tích:</span>
                  <span>500 hecta</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Năm hoạt động:</span>
                  <span>2019</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Thông số kỹ thuật
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Loại pin:</span>
                  <span>Poly-crystalline</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Số lượng tấm pin:</span>
                  <span>1.2 triệu tấm</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Hiệu suất:</span>
                  <span>17.5%</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Tuổi thọ:</span>
                  <span>25 năm</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Description */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-gray-600 leading-relaxed">
              Nhà máy điện mặt trời này là một trong những dự án năng lượng tái
              tạo lớn nhất tại Việt Nam. Với công nghệ tiên tiến và quy mô lớn,
              nhà máy đóng góp đáng kể vào việc đảm bảo an ninh năng lượng quốc
              gia và giảm phát thải khí nhà kính.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolarPlantInfo;
