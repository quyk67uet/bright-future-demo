"use client";
import React, { useState } from "react";
import LinkButton from "../button/LinkButton";
import SolarPanelFinance from "./SolarPanelFinance";
import Heading from "../heading/Heading";

const Section2 = () => {
  const [bill, setBill] = useState(100); // Default value for the bill
  const MenuInfo = [
    {
      image: "/images/ic_co2.png",
      title: "Carbon dioxide",
      value: 1.5,
      unit: "tấn mét",
    },
    {
      image: "/images/ic_car.png",
      title: "Xe khách",
      value: 0.3,
      unit: "đi trong vòng 1 năm ",
    },
    {
      image: "/images/ic_tree.png",
      title: "Cây xanh ",
      value: 25.8,
      unit: "10 năm",
    },
  ];
  return (
    <div className="bg-background-grey py-[40px]">
      <div className="flex flex-col items-center">
        <Heading title="Cung cấp thông tin chính xác để xác định được khoảng tiền tiết kiệm của bạn" />
        <div className="flex gap-5 mb-[40px]">
          {/* Average Monthly Electric Bill Card */}
          <div className="border rounded-lg p-5 w-72 text-center shadow-md">
            <h4 className="font-semibold text-lg mb-3">
              HÓA ĐƠN ĐIỆN HÀNG THÁNG
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Hãy đưa ra hoặc ước lượng hóa đơn điện hàng tháng của bạn
            </p>
            <select
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="border rounded px-3 py-2 w-full"
            >
              <option value={50}>$50</option>
              <option value={100}>$100</option>
              <option value={150}>$150</option>
              <option value={200}>$200</option>
            </select>
          </div>

          {/* Recommended Solar Installation Size Card */}
          <div className="border rounded-lg p-5 w-72 text-center shadow-md">
            <h4 className="font-semibold text-lg mb-3">
              LOẠI PIN MẶT TRỜI PHÙ HỢP CHO BẠN
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Kích thước này sẽ đáp ứng khoảng 87% lượng điện sử dụng của bạn.
              Các hệ thống lắp đặt năng lượng mặt trời được tính theo
              kilowatt(kW).
            </p>
            <h2 className="text-3xl font-bold mb-2">2.4 kW</h2>
            <p className="text-gray-500">(127 ft²)</p>
          </div>
        </div>
        <div className="flex flex-col items-center border rounded-lg p-5 text-center shadow-md mb-[40px]">
          <h4 className="font-semibold text-lg mb-3">
            Lượng Carbon mà bạn có thể giảm
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Ước tính lượng Carbon có thể giảm được hằng năm nếu bạn chuyển sang
            sử dụng năng lượng mặt trời theo đề xuất của chúng tôi
          </p>
          <div className="flex gap-8 mb-[25px]">
            {/* Carbon Dioxide Section */}
            {MenuInfo.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 mb-2 mr-[5px]"
                  />
                  <div className="flex flex-col text-left">
                    <h4 className="font-semibold text-gray-700">
                      {item.title}
                    </h4>
                    <p className="text-3xl font-bold">{item.value}</p>
                    <p className="text-sm text-gray-500">{item.unit}</p>
                  </div>
                </div>
                {index !== MenuInfo.length - 1 && (
                  <div className="text-2xl font-bold">=</div>
                )}
              </div>
            ))}
          </div>
          <LinkButton
            text="See total solar potential for this zip code"
            color="text-blue-600"
          />
        </div>
      </div>
      <SolarPanelFinance />
    </div>
  );
};

export default Section2;
