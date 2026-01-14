const Button = ({ title }: { title: string }) => {
  return (
    <button className="uppercase px-[15px] py-[10px] text-white font-bold bg-primary-orange">
      {title}
    </button>
  );
};
export default Button;
