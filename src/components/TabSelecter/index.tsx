import { useField } from "formik";
import { memo, useEffect, useState } from "react";

interface TabSelectorProps {
  onChange: any;
  options: Array<{
    key: string;
    value: any;
    name: string;
  }>;
  defaultValue: any;
  label: string;
  name: string;
}

const TabSelector = (props: TabSelectorProps) => {
  const { options, onChange, defaultValue, label, name } = props;
  const [value, setValue] = useState(defaultValue);

  const [field, meta, helpers] = useField(name);

  const handleChange = (opt: any) => (e: any) => {
    setValue(opt.value);
    helpers.setValue(opt.value);
    () => onChange && onChange(opt.value)
  }

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <div className="tab-selector">
      {label && <div className="label">{label}</div>}
      <div className="value">
        {options.map((opt) => (
            <div
            onClick={handleChange(opt)}
            key={opt.key}
            className={
              opt.value === value ? "tab-item active" : "tab-item"
            }
            >
            {opt.name}
            </div>
        ))}
      </div>
    </div>
  );
};

export default memo(TabSelector);
