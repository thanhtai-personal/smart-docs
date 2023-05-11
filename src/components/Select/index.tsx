import { useField } from "formik";

const Select = (props: any) => {
  const { onChange, defaultValue, getOptions, label, name } = props;
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers

  const handleChange = (e: any) => {
    setValue(e.target.value);
    onChange && onChange(e);
  }

  return (
    <div className="select-wrapper">
      <div className="label">{label}</div>
      <select
        className="node-selection"
        placeholder="Select parent node"
        onChange={handleChange}
        defaultValue={defaultValue}
        name={name}
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
