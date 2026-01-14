import { DailyData } from "../interfaces/form/SolarAnalysisInterface";
export const calculateSolarPowerHour = (dailyData: DailyData[]) => {
  // Đặt ngưỡng GII tối thiểu để coi là ánh sáng hữu ích (kWh/m²/ngày)
  const usableGiiThreshold = 5.0;

  // Đếm số ngày có ánh sáng mặt trời hữu ích
  const usableDays = dailyData.filter(
    (day) => day.gii >= usableGiiThreshold
  ).length;

  // Giả sử mỗi ngày có 8 giờ ánh sáng mặt trời hữu ích
  const usableSunlightHoursPerYear = usableDays * 8;

  return usableSunlightHoursPerYear;
};
