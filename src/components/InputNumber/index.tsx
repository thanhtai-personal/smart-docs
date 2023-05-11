import { useEffect, useRef } from "react";

const InputNumber = (props: any) => {
  const { name, onChange, value, placeholder } = props;
  const inputRef: any = useRef();

  useEffect(() => {
    inputRef.current.value = value || "";
  }, [value])

  return (
    <input
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      ref={inputRef}
      type="number"
    />
  );
};

export default InputNumber;
