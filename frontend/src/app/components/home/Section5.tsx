import Button from "../button/Button";
const Section5 = () => {
  return (
    <div className="bg-[url('/images/solar-energy.jpg')] bg-cover h-[241px] flex flex-col items-center justify-center">
      <h2 className="font-bold text-[32px] mb-[20px] text-center">
        Khai phá tiềm năng của năng lượng mặt trời
      </h2>
      <form className="mt-[20px] mb-[15px]">
        <input
          type="text"
          placeholder="Nhập địa chỉ"
          className="h-[40px] w-[400px] outline-none pl-[15px]"
        />
        <Button title="Tính toán" />
      </form>
    </div>
  );
};
export default Section5;
