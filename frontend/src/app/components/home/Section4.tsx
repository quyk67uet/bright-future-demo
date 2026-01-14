import Image from "next/image";
import LinkButton from "../button/LinkButton";
const Section4 = () => {
  return (
    <div className="flex flex-col items-center py-[40px]">
      <div className="w-[75%]">
        <h2 className="font-bold text-[32px] mb-[20px] text-center">
          Khai phá tiềm năng của năng lượng mặt trời
        </h2>
        <p className="text-center mb-[40px]">
          Sử dụng tọa độ, địa chỉ để xác định năng lượng điện từ năng lượng mặt
          trời cũng như lượng chi phí tối ưu được cho người dùng
        </p>
        <LinkButton
          text="Khám phá khu vực của bạn"
          color="text-primary-orange"
        />
        <Image
          src="/images/coverage.png"
          alt="coverage"
          width={960}
          height={600}
        />
      </div>
    </div>
  );
};
export default Section4;
