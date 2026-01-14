const PriceDesc = ({ price, desc }: { price: string; desc: string }) => {
  return (
    <div className="text-center">
      <p className="text-[48px]  text-primary-purple">{price}</p>
      <p className="text-xs text-gray-600">{desc}</p>
    </div>
  );
};
export default PriceDesc;
