const InputArea = (props: any) => {
  const { name, onChange, value, placeholder, rows = 10 } = props;

  const handleChange = (e: any) => {
    onChange && onChange(e.target.value);
  };

  return (
    <textarea
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      style={{ padding: "8px" }}
      rows={rows}
    />
  );
};

export default InputArea;
