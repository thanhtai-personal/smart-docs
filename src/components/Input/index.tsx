import { useEffect, useRef } from "react";

const Input = (props: any) => {
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
      // value={defaultValue}
      ref={inputRef}
    />
  );
};

export default Input;
