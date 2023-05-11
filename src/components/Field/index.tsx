import { useField } from "formik";
import { memo } from "react";

const Field = (props: any) => {
  const { item, getOptions } = props;
  const [field, meta, helpers] = useField(item);

  const handleChangeField = (newValue: any) => {
    console.log("newValue", newValue);
    helpers.setValue(newValue);
  };

  return (
    <div className="field">
      {item.render({
        getOptions: getOptions[item.name],
        item,
        value: field.value,
        onChange: handleChangeField,
        meta, //{ error, touched }
      })}
    </div>
  );
};

export default memo(Field);
