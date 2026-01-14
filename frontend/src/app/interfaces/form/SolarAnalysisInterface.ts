export interface SolarAnalysisInterface {
  average_daily_energy: number;
  average_daily_gii: number;
  daily_values: DailyData[];
  max_daily_gii: number;
  min_daily_energy: number;
  module_efficiency: number;
  monthly_values: object[];
  performance_ratio: number;
  system_capacity: number;
  yearly_total_energy: number;
  yearly_total_gii: number;
}

export interface DailyData {
  date: string;
  gii: number;
  energy: number;
}
