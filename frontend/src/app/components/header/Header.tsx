import { Sun } from "lucide-react";
import Link from "next/link";
import { FiAlignJustify } from "react-icons/fi";

const Header = () => {
  const MenuLinks = [
    {
      title: "Dự đoán",
      url: "/estimator",
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
    <header className="w-full h-[60px] fixed top-0 left-0 right-0 flex items-center justify-between border-b-2 border-orange-500 bg-white shadow-md z-[9999]">
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link href={"/"}>
          <div className="flex items-center h-full px-4">
            <Sun className="h-8 w-8 text-orange-500 mr-[10px]" />
            <span className="text-2xl font-bold text-blue-900">
              Bright Future
            </span>
          </div>
        </Link>
        <nav className="h-full">
          <ul className="flex h-full">
            {MenuLinks.map((item, index) => (
              <li
                key={index}
                className="px-4 flex items-center h-full text-text-grey text-[15px] hover:text-orange-500 transition-colors duration-300"
              >
                <Link href={item.url}>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
