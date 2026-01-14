const LinkButton = ({ text, color }: { text: string; color: string }) => {
  return (
    <div className={`uppercase text-center ${color}`}>
      <a href="/">{text}</a>
    </div>
  );
};
export default LinkButton;
