import Link from "next/link";

const Footer = () => {
  const MenuLinks = [
    { title: "Giới thiệu", url: "/about" },
    { title: "Quyền riêng tư", url: "/privacy" },
    { title: "Điều khoản", url: "/terms" },
    { title: "Phản hồi", url: "/feedback" },
  ];

  return (
    <footer className="w-full bg-[#f5f5f5] py-[15px] border-t-2 border-orange-500">
      <div className="container mx-auto flex items-center">
        <div className="text-xl font-bold text-title-grey ml-[30px] mr-[220px]">
          Bright Future
        </div>
        <nav>
          <ul className="flex items-center">
            {MenuLinks.map((item, index) => (
              <li key={index} className="mx-[20px] text-[15px] text-text-grey">
                <Link href={item.url}>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
