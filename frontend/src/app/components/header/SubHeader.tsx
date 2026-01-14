import Link from "next/link";
import React from "react";

const SubHeader = () => {
  const MenuLinks = [
    {
      title: "Dự đoán",
      url: "/estimator",
    },

    {
      title: "Tư vấn lắp đặt",
      url: "/consulting",
    },
    {
      title: "Lịch sử",
      url: "/history",
    },
    {
      title: "Giới thiệu",
      url: "/about",
    },
  ];
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgMjVsNiA2LTYgNk0xMCAyNWwtNiA2IDYgNiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')]"></div>
      </div>
      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-bold text-gray-800">Bright Future</div>
        </Link>
        <div className="flex space-x-8">
          {MenuLinks.map((item, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-600 hover:text-gray-800"
            >
              <Link href={item.url}>{item.title}</Link>
            </a>
          ))}
        </div>
      </nav>
      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-navy-900 mb-8 bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
            Bright Future
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Giải pháp dự đoán và tối ưu năng lượng mặt trời cho mọi đối tượng
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transform hover:-translate-y-0.5 transition-all font-medium">
              <Link href="/consulting">TƯ VẤN NGAY</Link>
            </button>
            <button className="px-8 py-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transform hover:-translate-y-0.5 transition-all font-medium">
              EXPLORE YOUR AREA
            </button>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "☀️",
                title: "Dự đoán chính xác",
                desc: "Công nghệ AI tiên tiến",
              },
              {
                icon: "⚡",
                title: "Tối ưu năng lượng",
                desc: "Tiết kiệm tối đa chi phí",
              },
              {
                icon: "🌱",
                title: "Thân thiện môi trường",
                desc: "Năng lượng xanh bền vững",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-white/60 backdrop-blur-sm rounded-xl hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="absolute top-40 left-10 w-32 h-32 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-40 left-60 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
  );
};

export default SubHeader;
