import AddressForm from "@/app/components/form/AddressForm";

const HouseHold = () => {
  return (
    <>
      <div className="flex justify-center items-center mt-[80px] mb-[100px]">
        <AddressForm link="/estimator/household/location" />
      </div>
    </>
  );
};
export default HouseHold;
