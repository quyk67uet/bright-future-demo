"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PriceDescLists from "./PriceDescLists";

const SolarPanelFinance = () => {
  const tabs = ["MUA", "THUÊ / PPA", "VAY"];
  const [activeTab, setActiveTab] = useState("MUA");
  const [showDetails, setShowDetails] = useState(false);
  const MenuPricesBuy = [
    {
      price: "$5,000",
      desc: "CHI PHÍ TRẢ TRƯỚC SAU KHI NHẬN ƯU ĐÃI",
    },
    {
      price: "$5,000",
      desc: "CHI PHÍ TRẢ TRƯỚC SAU KHI NHẬN ƯU ĐÃI",
    },
    {
      price: "$20,000",
      desc: "LỢI ÍCH TRONG 20 NĂM",
    },
    {
      price: "$15,000",
      desc: "TIẾT KIỆM TỔNG CỘNG TRONG 20 NĂM",
    },
  ];
  const MenuPricesLease = [
    {
      price: "$5,000",
      desc: "CHI PHÍ TRẢ TRƯỚC SAU KHI NHẬN ƯU ĐÃI",
    },
    {
      price: "$20,000",
      desc: "LỢI ÍCH TRONG 20 NĂM",
    },
    {
      price: "$15,000",
      desc: "TIẾT KIỆM TỔNG CỘNG TRONG 20 NĂM",
    },
  ];
  const MenuPricesLoan = [
    {
      price: "$5,000",
      desc: "CHI PHÍ TRẢ TRƯỚC SAU KHI NHẬN ƯU ĐÃI",
    },
    {
      price: "$20,000",
      desc: "LỢI ÍCH TRONG 20 NĂM",
    },
    {
      price: "$15,000",
      desc: "TIẾT KIỆM TỔNG CỘNG TRONG 20 NĂM",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        TÌM HIỂU CÁCH TỐI ƯU CHI PHÍ CHO TẤM PIN NĂNG LƯỢNG MẶT TRỜI CỦA BẠN
      </h2>

      <div className="flex mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "MUA" && (
        <div>
          <p className="mb-4">
            <span className="font-semibold text-primary-purple">
              Trả trước, tiết kiệm lớn nhất trong suốt thời gian sử dụng.
            </span>{" "}
            Bạn trả toàn bộ chi phí trước và sở hữu hệ thống năng lượng mặt trời
            mà không cần thêm bất kỳ khoản thanh toán nào theo thời gian. Là chủ
            sở hữu hoàn toàn, bạn có thể yêu cầu bất kỳ ưu đãi nào từ doanh
            nghiệp.
          </p>

          <div className="flex flex-wrap justify-between mb-4">
            <PriceDescLists MenuPrices={MenuPricesBuy} />
          </div>

          <button
            className="flex items-center justify-center w-full py-2 text-blue-500 hover:bg-blue-50 rounded"
            onClick={() => setShowDetails(!showDetails)}
          >
            HIỂN THỊ ƯỚC TÍNH CHI TIẾT
            {showDetails ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            )}
          </button>

          {showDetails && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p>Ước tính chi tiết sẽ được hiển thị ở đây...</p>
            </div>
          )}
        </div>
      )}

      {activeTab == "THUÊ / PPA" && (
        <div>
          <p className="mb-4">
            <span className="font-semibold text-primary-purple">
              Tiết kiệm ngay lập tức, không trả trước.
            </span>{" "}
            Bạn sẽ thanh toán hàng tháng cho công ty cho thuê năng lượng mặt
            trời sở hữu và bảo trì hệ thống của bạn. Bạn sẽ có chi phí trả trước
            nhỏ và bạn có thể có tùy chọn mua toàn bộ hệ thống của mình trong
            tương lai.
          </p>

          <div className="flex justify-between mb-4">
            <PriceDescLists MenuPrices={MenuPricesLease} />
          </div>

          <button
            className="flex items-center justify-center w-full py-2 text-blue-500 hover:bg-blue-50 rounded"
            onClick={() => setShowDetails(!showDetails)}
          >
            HIỂN THỊ ƯỚC TÍNH CHI TIẾT
            {showDetails ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            )}
          </button>
        </div>
      )}
      {activeTab == "VAY" && (
        <div>
          <p className="mb-4">
            <span className="font-semibold text-primary-purple">
              Sở hữu hệ thống của bạn, thanh toán theo thời gian.
            </span>{" "}
            Khoản vay là một cách tuyệt vời để tận dụng các ưu đãi và tiết kiệm
            dài hạn của hệ thống năng lượng mặt trời mà không cần phải trả trước
            toàn bộ số tiền mặt. Hàng tháng, bạn sẽ thực hiện thanh toán để trả
            nợ gốc và lãi vay.
          </p>

          <div className="flex justify-between mb-4">
            <PriceDescLists MenuPrices={MenuPricesLoan} />
          </div>

          <button
            className="flex items-center justify-center w-full py-2 text-blue-500 hover:bg-blue-50 rounded"
            onClick={() => setShowDetails(!showDetails)}
          >
            HIỂN THỊ ƯỚC TÍNH CHI TIẾT
            {showDetails ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SolarPanelFinance;
