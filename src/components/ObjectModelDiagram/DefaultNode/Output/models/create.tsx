import Input from "@/components/Input";
import InputNumber from "@/components/InputNumber";
import RadioCheckbox from "@/components/RadioCheckbox";
import Select from "@/components/Select";
import TabSelector from "@/components/TabSelecter";
import { positionOptions } from "@/utils/constants";

const OutputModel = {
  id: {
    priority: 1,
    render: ({ handleChange, values }: any) => {
      return (
        <Input
          name="id"
          placeholder="Enter unique id"
          onChange={handleChange}
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
  className: {
    priority: 3,
    render: ({ handleChange, values }: any) => {
      return (
        <Input
          name="className"
          onChange={handleChange}
          placeholder="Enter className (heading)"
          value={values?.className}
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
  targetPosition: {
    priority: 8,
    render: ({ handleChange, values }: any) => {
      return (
        <TabSelector
          onChange={handleChange}
          options={positionOptions}
          defaultValue={values?.targetPosition}
          label={"Target position:"}
        />
      );
    },
  },
  sourcePosition: {
    priority: 9,
    render: ({ handleChange, values }: any) => {
      return (
        <TabSelector
          onChange={handleChange}
          options={positionOptions}
          defaultValue={values?.sourcePosition}
          label={"Source position:"}
        />
      );
    },
  },
};

export default OutputModel;
