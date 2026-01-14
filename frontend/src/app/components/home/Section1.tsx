import React from "react";
import { Sun, Map, ArrowRight, LucideProps } from "lucide-react";
import Link from "next/link";

const Section1 = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background with texture */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50"> */}
      <div className="absolute inset-0 bg-cover backdrop-blur-md bg-[url('/images/solar-energy.jpg')]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.3,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center pt-32 pb-20">
          <h1 className="text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
              Bright Future
            </span>
          </h1>

          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Giải pháp dự đoán và tối ưu năng lượng mặt trời cho mọi đối tượng
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href={"/estimator"}>
              <button className="group flex items-center px-8 py-4 bg-orange-500 text-white rounded-xl shadow-lg hover:bg-orange-600 transition-all duration-300">
                <span className="font-medium">TƯ VẤN NGAY</span>
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <button className="group flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-blue-600 rounded-xl hover:bg-white transition-all duration-300">
              <Map className="w-5 h-5 mr-2" />
              <span className="font-medium">KHÁM PHÁ KHU VỰC</span>
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-orange-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
    </div>
  );
};

// Helper Components
const NavLink = ({ href, text }: { href: string; text: string }) => (
  <a
    href={href}
    className="text-gray-600 hover:text-blue-900 transition-colors duration-300"
  >
    {text}
  </a>
);
interface FeatureCardProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
}
const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="p-6 flex flex-col items-center bg-white/70 backdrop-blur-sm rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className=" w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-orange-500" />
    </div>
    <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Data
const features = [
  {
    icon: Sun,
    title: "Năng lượng sạch",
    description: "Giải pháp năng lượng tái tạo thân thiện với môi trường",
  },
  {
    icon: Map,
    title: "Tối ưu hiệu suất",
    description: "Phân tích và dự đoán để tối ưu hóa hiệu suất hệ thống",
  },
  {
    icon: ArrowRight,
    title: "Dễ dàng tích hợp",
    description: "Tích hợp nhanh chóng với hệ thống hiện có của bạn",
  },
];

export default Section1;
