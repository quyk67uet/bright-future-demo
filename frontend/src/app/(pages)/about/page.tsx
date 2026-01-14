import React from "react";
import { Users, Target, Sun, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {

  const companyStats = [
    {
      icon: <Sun className="w-8 h-8 text-purple-600" />,
      number: "5000+",
      label: "Người dùng ứng dụng",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      number: "2500+",
      label: "Khách hàng hài lòng",
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      number: "50+",
      label: "Giải thưởng",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Bright Future</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tại Bright Future, chúng tôi cam kết làm cho năng lượng mặt trời dễ
          tiếp cận và giá cả phải chăng cho mọi người. Sứ mệnh của chúng tôi là
          đẩy nhanh quá trình chuyển đổi của thế giới sang năng lượng bền vững.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {companyStats.map((stat, index) => (
          <Card
            key={index}
            className="text-center p-6 hover:shadow-lg transition-shadow"
          >
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission Section */}
      <div className="bg-purple-50 rounded-2xl p-8 mb-16">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <Target className="w-12 h-12 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sứ mệnh</h2>
            <p className="text-gray-600 mb-4">
              Chúng tôi hình dung một thế giới mà năng lượng sạch, tái tạo là
              tiêu chuẩn, không phải là ngoại lệ. Nhóm của chúng tôi làm việc
              không mệt mỏi để biến tầm nhìn này thành hiện thực thông qua các
              giải pháp năng lượng mặt trời sáng tạo, dịch vụ khách hàng đặc
              biệt và tiến bộ công nghệ liên tục.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <Sun className="w-5 h-5 text-purple-600 mr-2" />
                Công nghệ tiên tiến hàng đầu
              </li>
              <li className="flex items-center">
                <Users className="w-5 h-5 text-purple-600 mr-2" />
                Gắn bó với khách hàng và cộng đồng
              </li>
              <li className="flex items-center">
                <Award className="w-5 h-5 text-purple-600 mr-2" />
                Duy trì uy tín và chất lượng
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center bg-purple-600 text-white rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">
          Sử dụng năng lượng sạch và tiết kiệm chi phí ngay hôm nay
        </h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Liên hệ với chúng tôi để biết thêm thông tin về giải pháp năng lượng
          và nhận được sự tư vấn phù hợp
        </p>
        <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Liên hệ
        </button>
      </div>
    </div>
  );
};

export default About;
