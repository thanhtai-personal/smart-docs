const InputNumber = (props: any) => {
  const { name, onChange, value, placeholder } = props;

  const handleChange = (e: any) => {
    onChange && onChange(e.target.value);
  };

  return (
    <input
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      type="number"
    />
  );
};

export default InputNumber;
