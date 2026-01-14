import Image from "next/image";
import Button from "../button/ Button";
const Section3 = () => {
  return (
    <>
      <div className="bg-[#f8f8f8] flex flex-col items-center py-[40px]">
        <div className="w-[75%]">
          <h2 className="font-bold text-[32px] mb-[20px] text-center">
            Dự đoán công suất điện mặt trời của bạn
          </h2>
          <p className="text-center mb-[40px]">
            Tiết kiệm năng lượng mặt trời được tính toán bằng cách sử dụng kích
            thước và hình dạng mái nhà, khu vực mái che ,thời tiết địa phương,
            giá điện địa phương, chi phí năng lượng mặt trời và các ưu đãi ước
            tính theo thời gian. Sử dụng một địa chỉ mẫu, hãy xem ước tính chi
            tiết mà Bright Future có thể cung cấp cho bạn.
          </p>
          <div className="flex justify-evenly">
            <div>
              <h3 className="text-[16px] font-bold">
                15, Tran Quang Dieu Street, Dong Da, Ha Noi, Vietnam{" "}
              </h3>
              <div className="py-[10px] border-y border-gray-300 my-[15px] flex flex-col">
                <div className="flex mb-[15px]">
                  <Image
                    src="/images/ic_sun.png"
                    alt="sun"
                    width={40}
                    height={40}
                    objectFit="cover"
                    className="mr-[10px]"
                  />
                  <div>
                    <h3>1,479 giờ năng lượng tái sử dụng mỗi năm</h3>
                    <p className="font-light text-[#212121] text-[14px]">
                      Dựa vào dữ liệu thời tiết đo đạc được
                    </p>
                  </div>
                </div>
                <div className="flex mb-[15px]">
                  <Image
                    src="/images/ic_house.png"
                    alt="house"
                    width={40}
                    height={40}
                    objectFit="cover"
                    className="mr-[10px]"
                  />
                  <div>
                    <h3>8m2 lắp đặt được pin mặt trời</h3>
                    <p className="font-light text-[#212121] text-[14px]">
                      Dựa vào độ che phủ, hình dạng mái nhà
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-[24px]">$18,000 tiết kiệm được </h3>
              <p className="font-light text-[#212121] text-[14px] mb-[20px]">
                Số tiền dự đoán sẽ tiết kiệm được trong tương lai{" "}
              </p>
              <Button title="Kiểm tra mái nhà" />
            </div>
            <Image
              src="/images/masked-house.png"
              alt="savings estimate"
              width={300}
              height={300}
              objectFit="cover"
              className=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Section3;
