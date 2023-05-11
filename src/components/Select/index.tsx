const Select = (props: any) => {
  const { onChange, defaultValue, getOptions, label, name } = props;

  const handleChange = (e: any) => {
    onChange && onChange(e.target.value);
  };

  return (
    <div className="select-wrapper">
      <div className="label">{label}</div>
      <select
        name={name}
        className="node-selection"
        placeholder="Select parent node"
        onChange={handleChange}
      >
        <option value={""}>None</option>
        {getOptions &&
          getOptions().map((opt: any) => (
            <option key={opt.key} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
