"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import FormSolar from "@/app/components/form/Form";
import SolarPanelSelector from "@/app/components/estimator/SolarPanelSelector";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

// Định nghĩa interface cho TypeScript
interface LocationData {
  mapUrl: string;
  imageUrl: string;
  imageAlt: string;
  area: number;
}

// Cấu hình locations để code DRY hơn
const LOCATIONS: Record<string, LocationData> = {
  "Trường Đại học Sư phạm Hà Nội": {
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8803921960503!2d105.78079297529551!3d21.03747128747921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab355cc2239b%3A0x9ae247114fb38da3!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBTxrAgUGjhuqFtIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1768366082106!5m2!1svi!2s",
    imageUrl: "/images/hnue-result.webp",
    imageAlt: "HNUE Campus View",
    area: 100,
  },
  "65 P. Trần Quang Diệu": {
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501.5119083026237!2d105.82398699044326!3d21.014863794317193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7eba2c62cd%3A0xddde897cad482f64!2zNjUgUC4gVHLhuqduIFF1YW5nIERp4buHdSwgQ2jhu6MgROG7q2EsIMSQ4buRbmcgxJBhLCBIw6AgTuG7mWksIFZpZXRuYW0!5e1!3m2!1sen!2s!4v1731627492401!5m2!1sen!2s",
    imageUrl: "/images/nha-result.webp",
    imageAlt: "Building View",
    area: 100,
  },
};

// Component để hiển thị location map và image
const LocationView = ({ mapUrl, imageUrl, imageAlt, area }: LocationData) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
        <iframe
          src={mapUrl}
          className="w-full md:w-1/2 h-64 md:h-96 transition-all duration-300"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="relative w-full md:w-1/2 h-64 md:h-96">
          <img
            className="w-full h-full object-cover transition-all duration-300"
            src={imageUrl}
            alt={imageAlt}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">
                    Diện tích mái nhà ước lượng: {area}m²
                  </span>
                  <div className="relative">
                    <button
                      type="button"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      className="text-blue-300 hover:text-blue-200 transition-colors"
                      aria-label="Thông tin về diện tích ước lượng"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                    {showTooltip && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white text-gray-800 text-xs rounded-lg shadow-xl p-3 z-50 border border-gray-200">
                        <div className="font-semibold mb-2 text-blue-600">
                          Cách tính diện tích ước lượng:
                        </div>
                        <ul className="space-y-1.5 text-gray-700">
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>
                              Dựa trên phân tích hình ảnh vệ tinh từ Google Earth
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>
                              Đo đạc diện tích mái nhà từ dữ liệu địa hình 3D
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>
                              Loại trừ các khu vực bị che bóng (cây cối, công trình khác)
                            </span>
                          </li>
                        </ul>
                        <div className="mt-2 pt-2 border-t border-gray-200 text-gray-600 italic">
                          <span className="text-orange-600">Lưu ý:</span> Đây là giá trị ước lượng ban đầu. Để có số liệu chính xác, vui lòng liên hệ tư vấn để khảo sát thực tế.
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-300">
                  Dựa trên phân tích hình ảnh vệ tinh và mô hình 3D
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const LocationDisplay = () => {
  const searchParams = useSearchParams();
  const [address, setAddress] = React.useState<string | null>(null);
  const [selectedPanel, setSelectedPanel] = useState(null);

  React.useEffect(() => {
    const queryAddress = searchParams.get("address");
    if (queryAddress) {
      // Tìm địa chỉ không phân biệt hoa thường
      const normalizedQuery = queryAddress.trim().toLowerCase();
      const foundKey = Object.keys(LOCATIONS).find(
        key => key.trim().toLowerCase() === normalizedQuery
      );
      if (foundKey) {
        setAddress(foundKey); // Sử dụng key gốc từ LOCATIONS
      }
    }
  }, [searchParams]);

  return (
    <div className="space-y-8 mt-[30px]">
      {/* Location View */}
      {address && LOCATIONS[address] && (
        <div className="animate-fadeIn">
          <LocationView {...LOCATIONS[address]} />
        </div>
      )}

      {/* Solar Panel Selection */}
      <div className="mt-8">
        <SolarPanelSelector
          selectedPanel={selectedPanel}
          onSelectPanel={setSelectedPanel}
        />
      </div>

      {/* Solar Form */}
      <div className="mt-8">
        <FormSolar
          link="/estimator/household/result"
          selectedPanel={selectedPanel}
        />
      </div>
    </div>
  );
};

export default LocationDisplay;
