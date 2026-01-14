"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import ModelSelect from "./ModelSelect";

// Mapping từ panel power sang model label
const getModelFromPanel = (panel: any): string | null => {
  if (!panel) return null;
  
  const power = parseInt(panel.power.replace(" W", ""));
  const modelMap: Record<number, string> = {
    450: "450Wp_44V_Mono",
    500: "500Wp_39V_Mono_PERC",
    545: "545Wp_41V_Mono_PERC",
    600: "600Wp_45V_Mono_PERC",
    620: "620Wp_46V_Mono_PERC",
  };
  
  return modelMap[power] || null;
};

const FormSolar = ({ link, selectedPanel }: { link: string; selectedPanel?: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [address, setAddress] = useState<string | null>(null);
  const [capacity, setCapacity] = useState(5);
  const [lat, setLat] = useState(10.7769);
  const [lon, setLon] = useState(106.6951);
  const [tilt, setTilt] = useState(20);
  const [model, setModel] = useState("450Wp_44V_Mono");
  const [azimuth, setAzimuth] = useState(180);
  const [pr, setPr] = useState(81);
  const [activeTab, setActiveTab] = useState("address");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Cập nhật model khi selectedPanel thay đổi
  useEffect(() => {
    if (selectedPanel) {
      const modelFromPanel = getModelFromPanel(selectedPanel);
      if (modelFromPanel) {
        setModel(modelFromPanel);
      }
    }
  }, [selectedPanel]);

  useEffect(() => {
    const queryAddress = searchParams.get("address");
    if (queryAddress) {
      setAddress(queryAddress);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      setErrorMessage("Address is not valid");
      return;
    }
    
    setIsLoading(true);
    
    // Thêm delay để hiển thị loading
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    router.push(
      `${link}?address=${address}&capacity=${capacity}&lat=${lat}&lon=${lon}&tilt=${tilt}&model=${model}&azimuth=${azimuth}&pr=${pr}`
    );
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
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
        <Card className="w-full p-6 space-y-6">
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
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Tổng công suất hệ thống pin (kW)
            </label>
            <div className="flex items-center">
              <Input
                type="number"
                value={capacity}
                onChange={(e: any) => setCapacity(e.target.value)}
                className="flex-grow"
              />
              <Button
                variant="ghost"
                className="px-2"
                onClick={() => setCapacity(Math.max(0, capacity - 1))}
              >
                -
              </Button>
              <Button
                variant="ghost"
                className="px-2"
                onClick={() => setCapacity(capacity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {activeTab === "address" ? (
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Nhập địa chỉ
              </label>
              <Input
                value={address || ""}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errorMessage && (
                <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Nhập kinh độ
              </label>
              <Input
                value={lat}
                onChange={(e) => setLat(parseFloat(e.target.value))}
              />
              <label className="block text-sm text-gray-600 mt-3 mb-1">
                Nhập vĩ độ
              </label>
              <Input
                value={lon}
                onChange={(e) => setLon(parseFloat(e.target.value))}
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Lựa chọn múi giờ
            </label>
            <select className="w-full border rounded-md p-2">
              <option>Asia/Ho_Chi_Minh</option>
            </select>
          </div>
          <ModelSelect model={model} onModelChange={setModel} />
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nhập độ nghiêng
            </label>
            <div className="space-y-2">
              <Input
                type="number"
                value={tilt}
                onChange={(e) => setTilt(parseFloat(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="90"
                value={tilt}
                onChange={(e) => setTilt(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0.00</span>
                <span>90.00</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nhập góc phương vị bề mặt (180 nghĩa là hướng thẳng về hướng Nam)
            </label>
            <div className="space-y-2">
              <Input
                type="number"
                value={azimuth}
                onChange={(e) => setAzimuth(parseFloat(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min="-180"
                max="180"
                value={azimuth}
                onChange={(e) => setAzimuth(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>-180</span>
                <span>180</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nhập tỷ lệ hiệu suất của nhà máy (%PR)
            </label>
            <div className="flex items-center">
              <Input
                type="number"
                value={pr}
                onChange={(e) => setPr(parseFloat(e.target.value))}
                className="flex-grow"
              />
              <Button
                variant="ghost"
                className="px-2"
                onClick={() => setPr(Math.max(0, pr - 1))}
              >
                -
              </Button>
              <Button
                variant="ghost"
                className="px-2"
                onClick={() => setPr(pr + 1)}
              >
                +
              </Button>
            </div>
          </div>
        </div>
        <Button
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
    </div>
  );
};

export default FormSolar;
