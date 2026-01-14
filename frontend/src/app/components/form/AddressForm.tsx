"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "../image/ImageUpload";
import { useRouter } from "next/navigation";

const AddressForm = ({ link }: { link: string }) => {
  let dictionary = [
    "Số 12, ngõ 88, phố Trần Quang Diệu",
    "VNU University of Engineering and Technology",
    "Trường Đại học Sư phạm Hà Nội",
    "65 P. Trần Quang Diệu",
    "KEPCO-KPS IPP3",
    "Số 1, Đại Cồ Việt",
    "Số 144, Xuân Thủy",
  ];
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(10.7769);
  const [lon, setLon] = useState(106.6951);
  const [activeTab, setActiveTab] = useState("address");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // So sánh không phân biệt hoa thường
    const normalizedAddress = address.trim().toLowerCase();
    const normalizedDictionary = dictionary.map(addr => addr.toLowerCase());
    
    if (!normalizedDictionary.includes(normalizedAddress)) {
      setIsLoading(false);
      setTimeout(() => {
        alert("Địa chỉ không hợp lệ");
      }, 5000);
      return;
    }
    
    // So sánh không phân biệt hoa thường khi set tọa độ
    if (normalizedAddress === "65 p. trần quang diệu") {
      setLat(21.01487839400569);
      setLon(105.82424742846861);
    } else if (normalizedAddress === "trường đại học sư phạm hà nội") {
      setLat(21.03939833687522);
      setLon(105.78321584775654);
    }
    
    // Thêm delay để hiển thị loading
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    router.push(`${link}?address=${address}&lat=${lat}&lon=${lon}`);
  };
  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLat(value);
  };

  const handleLonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLon(value);
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <svg
              className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-blue-600 font-medium">Đang xử lý dữ liệu...</p>
          </div>
        </div>
      )}
      <Card className="w-full max-w-md p-6 space-y-6">
      <div className="flex space-x-2">
        <Button
          variant={activeTab === "address" ? "default" : "secondary"}
          className={`w-24 ${
            activeTab === "address"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("address")}
        >
          Địa chỉ
        </Button>
        <Button
          variant={activeTab === "coordinates" ? "default" : "secondary"}
          className={`w-24 ${
            activeTab === "coordinates"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("coordinates")}
        >
          Tọa độ
        </Button>
      </div>

      <div className="space-y-4">
        {activeTab === "address" ? (
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nhập địa chỉ
            </label>
            <Input onChange={handleAddress} />
            {errorMessage && (
              <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
            )}
          </div>
        ) : (
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nhập kinh độ
            </label>
            <Input onChange={handleLatChange} />
            <label className="block text-sm text-gray-600 mt-3 mb-1">
              Nhập vĩ độ
            </label>
            <Input onChange={handleLonChange} />
          </div>
        )}
        <ImageUpload />
      </div>
      <Button
        type="submit"
        className="w-full outline-none bg-blue-500 hover:bg-blue-600 text-white mt-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Đang xử lý...
          </div>
        ) : (
          "Gửi"
        )}
      </Button>
    </Card>
    </div>
  );
};

export default AddressForm;
