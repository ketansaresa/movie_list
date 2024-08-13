type InputProps = {
    label: string;
    value?: string;
}

export const InputCheckbox = ({ label }: InputProps) => {
  return (
    <label className="custom-checkbox-container">
        <input type="checkbox" className="custom-checkbox" />
        <span className="custom-checkbox-label">{label}</span>
  </label>
  );
};
