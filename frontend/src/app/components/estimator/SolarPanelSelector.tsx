import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const panels = [
  {
    id: 1,
    name: "NSX: Hanwha Q Cells",
    efficiency: "20.2%",
    length: "2163 mm",
    width: "1030 mm",
    area: "2.22789 m²",
    power: "450 W",
    image: "/images/450Wp_44V_Mono.png",
  },
  {
    id: 2,
    name: "NSX: LONGi",
    efficiency: "21.1%",
    length: "2094 mm",
    width: "1134 mm",
    area: "2.374596 m²",
    power: "500 W",
    image: "/images/500Wp_39V_Mono_PERC.jpg",
  },
  {
    id: 3,
    name: "NSX: Jinko Solar",
    efficiency: "21.13%",
    length: "2278 mm",
    width: "1134 mm",
    area: "2.583252 m²",
    power: "545 W",
    image: "/images/545Wp_41V_Mono_PERC.jpg",
  },
  {
    id: 4,
    name: "NSX: Jinko Solar",
    efficiency: "21.48%",
    length: "2465 mm",
    width: "1134 mm",
    area: "2.79531 m²",
    power: "600 W",
    image: "/images/600Wp_45V_Mono_PERC.jpg",
  },
  {
    id: 5,
    name: "NSX: Jinko Solar",
    efficiency: "22.19%",
    length: "2465 mm",
    width: "1134 mm",
    area: "2.79531 m²",
    power: "620 W",
    image: "/images/620Wp_46V_Mono_PERC.jpg",
  },
];

const SolarPanelSelector = ({ selectedPanel, onSelectPanel }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-[32px] font-semibold mb-4">
        Lựa chọn tấm pin phù hợp
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {panels.map((panel) => (
          <Card
            key={panel.id}
            className={`relative p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedPanel?.id === panel.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelectPanel(panel)}
          >
            <div className="flex items-start space-x-4">
              <div className="w-24 h-32 flex-shrink-0">
                <img
                  src={panel.image}
                  alt={panel.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="font-medium text-base">{panel.name}</h4>
                <div className="space-y-1 text-sm">
                  <p>Hiệu suất: {panel.efficiency}</p>
                  <p>Chiều dài: {panel.length}</p>
                  <p>Chiều rộng: {panel.width}</p>
                  <p>Diện tích: {panel.area}</p>
                  <p>Điện tối đa: {panel.power}</p>
                </div>
              </div>
              {selectedPanel?.id === panel.id && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SolarPanelSelector;
