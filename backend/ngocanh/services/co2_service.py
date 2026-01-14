from typing import Dict

class CO2Service:
    @staticmethod
    def calculate_co2_metrics(kwh: float) -> Dict:
        """
        Calculate CO2 metrics from kilowatt hours:
        - Converts kWh to metric tons of CO2
        - Calculates equivalent number of trees needed
        - Calculates equivalent number of cars
        - Calculates equivalent number of phones charged
        """
        # Calculate CO2 from kWh
        co2_per_kwh = 0.6766 * 10**-3
        co2_metric_tons = round(kwh * co2_per_kwh, 4)
        
        # Calculate equivalent trees
        co2_per_tree = 0.06
        trees = round(co2_metric_tons / co2_per_tree, 2)
        
        # Calculate equivalent cars
        co2_per_vehicle = 4.2
        cars = round(co2_metric_tons / co2_per_vehicle, 2)
        
        #calculate equivalent phones
        co2_per_phone = 1.51 * 10**-5
        phones = round(co2_metric_tons / co2_per_phone)
        # Return combined results as dictionary
        return {
            "co2_from_kwh": co2_metric_tons,
            "equivalent_trees": trees,
            "equivalent_cars": cars,
            "equivalent_phones": phones,

            "messages": {
                "co2_message": f"{co2_metric_tons} metric tons of CO2",
                "trees_message": f"{trees} urban tree seedlings grown for 10 years",
                "cars_message": f"{cars} gasoline-powered passenger vehicles driven for one year",
                "phones_message": f"{phones} smartphones charged"
            }
        }