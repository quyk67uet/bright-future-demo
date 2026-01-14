"use client";
import React from "react";
import { SolarAnalysisInterface } from "@/app/interfaces/form/SolarAnalysisInterface";

const SolarAnalysis = ({
  data,
  lat,
  lon,
}: {
  data: SolarAnalysisInterface;
  lat: number;
  lon: number;
}) => {
  return (
    <div className="relative w-full bg-gray-200">
      <iframe
        src={`http://localhost:5000?lat=${lat}&lon=${lon}`}
        width="100%"
        height="850px"
        title="Solar Analysis"
        style={{ border: "0", overflow: "hidden" }}
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default SolarAnalysis;
