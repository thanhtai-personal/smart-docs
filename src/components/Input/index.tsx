const Input = (props: any) => {
  const { name, onChange, defaultValue, placeholder } = props;

  return (
    <input
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      value={defaultValue}
    />
  );
};

export default Input;
