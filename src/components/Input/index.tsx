const Input = (props: any) => {
  const { name, onChange, value, placeholder } = props;

  const handleChange = (e: any) => {
    onChange && onChange(e.target.value);
  };

  return (
    <input name={name} onChange={handleChange} placeholder={placeholder} />
  );
};

export default Input;
