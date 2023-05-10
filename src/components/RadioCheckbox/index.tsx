const RadioCheckbox = (props: any) => {
  const { name, onChange, defaultValue, label } = props;

  return (
    <div className="checkbox-wrapper">
      <div className="label">{label}</div>
      <input
        name={name}
        onChange={onChange}
        value={defaultValue}
        type="checkbox"
      />
    </div>
  );
};

export default RadioCheckbox;
