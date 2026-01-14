import { PriceDescInterface } from "@/app/interfaces/pricedesc/PriceDescInterface";
import PriceDesc from "./PriceDesc";

const PriceDescLists = ({
  MenuPrices,
}: {
  MenuPrices: PriceDescInterface[];
}) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {MenuPrices.map((item, index) => (
        <PriceDesc key={index} price={item.price} desc={item.desc} />
      ))}
    </div>
  );
};
export default PriceDescLists;
