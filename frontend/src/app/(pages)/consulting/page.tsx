import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Factory } from "lucide-react";
import Link from "next/link";

const ConsultingPage = () => {
  const customerTypes = [
    {
      id: "household",
      icon: <Home className="w-12 h-12" />,
      title: "Hộ gia đình",
      description: "Giải pháp năng lượng mặt trời cho nhà ở",
      color: "blue",
      link: "/estimator/household",
    },
    {
      id: "factory",
      icon: <Factory className="w-12 h-12" />,
      title: "Nhà máy điện",
      description: "Giải pháp điện mặt trời quy mô lớn",
      color: "orange",
      link: "/estimator/factory",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Chọn loại dịch vụ</h2>
        <p className="text-gray-600">
          Chúng tôi có giải pháp phù hợp cho mọi nhu cầu của bạn
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {customerTypes.map((type) => (
          <Link key={type.id} href={type.link}>
            <Card
              key={type.id}
              className="group relative overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="relative z-10">
                  <div
                    className={`mb-6 text-${type.color}-500 transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{type.title}</h3>
                  <p className="text-gray-600 text-sm">{type.description}</p>
                </div>

                {/* Decorative background circle */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-${type.color}-50 rounded-full -mr-16 -mt-16 transition-transform duration-300 group-hover:scale-150`}
                ></div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardContent>

              {/* Bottom border highlight */}
              <div
                className={`absolute bottom-0 left-0 w-full h-1 bg-${type.color}-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
              ></div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ConsultingPage;
