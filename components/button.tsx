export const Button = ({ text, onClick }: any) => {
  return (
    <button className="bg-[#2BD17E] text-font-primary w-64 px-10 py-4 rounded-lg" onClick={onClick}>
        {text}
    </button>
  );
};
