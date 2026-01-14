"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DailyData } from "@/app/interfaces/form/SolarAnalysisInterface";
import { SolarAnalysisInterface } from "@/app/interfaces/form/SolarAnalysisInterface";
import { calculateSolarPowerHour } from "@/app/helpers/calculateSolarPower";

const SolarAnalysis = ({ data }: { data: SolarAnalysisInterface }) => {
  const searchParams = useSearchParams();
  const [inputType, setInputType] = useState("address");
  const [address, setAddress] = useState<string | null>(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(true);
  let usableSunlightHoursPerYear = 0;

  useEffect(() => {
    const queryAddress = searchParams.get("address");
    if (queryAddress) {
      setAddress(queryAddress);
    }
  }, [searchParams]);

  const getIframeSrc = (address: string | null) => {
    if (!address) return null;
    
    // So sánh không phân biệt hoa thường
    const normalizedAddress = address.trim().toLowerCase();
    
    if (normalizedAddress === "65 p. trần quang diệu") {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d421.71951406013903!2d105.82403442187301!3d21.014882127496016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7eba2c62cd%3A0xddde897cad482f64!2zNjUgUC4gVHLhuqduIFF1YW5nIERp4buHdSwgQ2jhu6MgROG7q2EsIMSQ4buRbmcgxJBhLCBIw6AgTuG7mWksIFZpZXRuYW0!5e1!3m2!1sen!2s!4v1731631395733!5m2!1sen!2s";
    } else if (normalizedAddress === "trường đại học sư phạm hà nội") {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8803921960503!2d105.78079297529551!3d21.03747128747921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab355cc2239b%3A0x9ae247114fb38da3!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBTxrAgUGjhuqFtIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1768366082106!5m2!1svi!2s";
    }
    return null;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputType === "coordinates") {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (
        isNaN(lat) ||
        isNaN(lng) ||
        lat < -90 ||
        lat > 90 ||
        lng < -180 ||
        lng > 180
      ) {
        alert("Please enter valid coordinates");
        return;
      }
    }
    setShowAnalysis(true);
  };

  const iframeSrc = address ? getIframeSrc(address) : null;

  return (
    <div className="relative w-full bg-gray-200">
      {iframeSrc ? (
        <iframe
          src={iframeSrc}
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      ) : (
        <p className="text-red-500">Không có địa chỉ hợp lệ trong URL.</p>
      )}

      {/* Analysis overlay */}
      <div className="absolute py-[40px] top-2 left-3 bg-white rounded-lg shadow-lg p-4 w-150 z-50">
        {showAnalysis && (
          <>
            <div className="mb-4">
              <div className="text-lg font-semibold mb-2">
                Địa điểm: <span className="">{address}</span>
              </div>
              <div className="flex items-center text-green-600 mb-2">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Phân tích xong. Mái nhà của bạn có:
              </div>

              <div className="flex items-center mb-2">
                <img
                  src="/images/ic_sun.png"
                  alt="sun"
                  className="w-10 h-10 mr-[10px] object-cover"
                />
                <div>
                  <div className="font-bold">
                    {/* {usableSunlightHoursPerYear} tiếng nắng mỗi năm */}
                    2938 tiếng nắng mỗi năm
                  </div>
                  <div className="text-sm text-gray-600">
                    Dựa trên dữ liệu thời tiết gần đây
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <img
                  src="/images/ic_house.png"
                  alt="house"
                  className="w-10 h-10 mr-[10px] object-cover"
                />
                <div>
                  <div className="font-bold">
                    Diện tích mái nhà để lắp pin của bạn: 200 m²
                  </div>
                  <div className="text-sm text-gray-600">
                    Dựa trên mô hình 3D của mái nhà và cây xung quanh
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="font-bold text-2xl mb-1">
                $15,000 tiết kiệm được
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Dự đoán số tiền bạn có thể tiết kiệm trong 20 năm tới
              </div>
              <div className="text-sm text-blue-600 cursor-pointer">
                Nhầm nhà? Click vào mái nhà khác để xem chi tiết.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SolarAnalysis;
