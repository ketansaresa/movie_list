type InputProps = {
    placeholder: string;
    value?: string;
    onChange?: any;
}

export const Input = ({ placeholder, value , onChange}: InputProps) => {
  return (
    <input
      required={true}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-[#224957] border-none outline-none rounded-lg text-font-primary px-6 py-3 w-full white-placeholder"
    />
  );
};
