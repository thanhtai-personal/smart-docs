import Input from "@/components/Input";
import InputArea from "@/components/InputArea";
import InputNumber from "@/components/InputNumber";
import RadioCheckbox from "@/components/RadioCheckbox";
import Select from "@/components/Select";

const expandFrameModel = {
  id: {
    priority: 1,
    render: ({ value, onChange }: any) => {
      return (
        <Input
          name="id"
          onChange={onChange}
          placeholder="Enter unique id"
          value={value}
        />
      );
    },
  },
  label: {
    priority: 2,
    render: ({ onChange, value }: any) => {
      return (
        <Input
          name="label"
          onChange={onChange}
          placeholder="Enter label"
          value={value}
        />
      );
    },
  },
  content: {
    priority: 3,
    render: ({ onChange, value }: any) => {
      return (
        <InputArea
          name="content"
          value={value}
          onChange={onChange}
          placeholder="Enter content text or html string"
        />
      );
    },
  },
  zIndex: {
    priority: 4,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <InputNumber
          name="zIndex: "
          onChange={onChange}
          placeholder="Enter zIndex"
          value={value}
        />
      );
    },
  },
  style: {
    priority: 5,
    render: ({ onChange, value }: any) => {
      return (
        <Input
          name="Style"
          onChange={onChange}
          placeholder="Enter style"
          value={value}
        />
      );
    },
  },
  selectable: {
    priority: 6,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <RadioCheckbox
          name="selectable"
          label={"Selectable:"}
          onChange={onChange}
          defaultValue={value}
          getOptions={getOptions}
        />
      );
    },
  },
  parentNode: {
    priority: 7,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <Select
          name={"parentNode"}
          label={"Parent node:"}
          onChange={onChange}
          defaultValue={value}
          getOptions={getOptions}
        />
      );
    },
  },
};

export default expandFrameModel;
