import Input from "@/components/Input";
import InputNumber from "@/components/InputNumber";
import RadioCheckbox from "@/components/RadioCheckbox";
import Select from "@/components/Select";

const expandFrameModel = {
  id: {
    priority: 1,
    render: ({ values, handleChange }: any) => {
      return (
        <Input
          name="id"
          onChange={handleChange}
          placeholder="Enter unique id"
          value={values?.id}
        />
      );
    },
  },
  label: {
    priority: 2,
    render: ({ handleChange, values }: any) => {
      return (
        <Input
          name="label"
          onChange={handleChange}
          placeholder="Enter label"
          value={values?.label}
        />
      );
    },
  },
  content: {
    priority: 3,
    render: ({ handleChange, values }: any) => {
      return (
        <textarea
          style={{ padding: "8px" }}
          rows={10}
          name="content"
          value={values?.content}
          onChange={handleChange}
          placeholder="Enter content text or html string"
        />
      );
    },
  },
  zIndex: {
    priority: 4,
    render: ({ handleChange, values, getOptions }: any) => {
      return (
        <InputNumber
          name="zIndex: "
          onChange={handleChange}
          placeholder="Enter zIndex"
          value={values?.zIndex}
        />
      );
    },
  },
  style: {
    priority: 5,
    render: ({ handleChange, values }: any) => {
      return (
        <Input
          name="Style"
          onChange={handleChange}
          placeholder="Enter style"
          value={values?.style}
        />
      );
    },
  },
  selectable: {
    priority: 6,
    render: ({ handleChange, values, getOptions }: any) => {
      return (
        <RadioCheckbox
          label={"Selectable:"}
          onChange={handleChange}
          defaultValue={values.selectable}
          getOptions={getOptions?.selectable}
        />
      );
    },
  },
  parentNode: {
    priority: 7,
    render: ({ handleChange, values, getOptions }: any) => {
      return (
        <Select
          label={"Parent node:"}
          onChange={handleChange}
          defaultValue={values.parentNode}
          getOptions={getOptions?.parentNode}
        />
      );
    },
  },
};

export default expandFrameModel;
