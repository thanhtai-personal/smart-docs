const RadioCheckbox = (props: any) => {
  const { name, onChange, label } = props;

  const handleChange = (e: any) => {
    onChange && onChange(e.target.checked);
  };

  return (
    <div className="checkbox-wrapper">
      <div className="label">{label}</div>
      <input name={name} onChange={handleChange} type="checkbox" />
    </div>
  );
};

export default RadioCheckbox;
