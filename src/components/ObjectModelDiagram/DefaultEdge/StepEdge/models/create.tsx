import Input from "@/components/Input";
import RadioCheckbox from "@/components/RadioCheckbox";
import Select from "@/components/Select";

const StepEdgeModel = {
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
    priority: 1.1,
    render: ({ handleChange, values }: any) => {
      return (
        <Input
          name="Label"
          onChange={handleChange}
          placeholder="Enter label"
          value={values?.label}
        />
      );
    },
  },
  style: {
    priority: 1.2,
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
  source: {
    priority: 2,
    render: ({ handleChange, values, getOptions }: any) => {
      return (
        <Select
          label={"Source node:"}
          onChange={handleChange}
          defaultValue={values.source}
          getOptions={getOptions?.source}
        />
      );
    },
  },
  target: {
    priority: 3,
    render: ({ handleChange, values, getOptions }: any) => {
      return (
        <Select
          label={"Target node:"}
          onChange={handleChange}
          defaultValue={values.target}
          getOptions={getOptions?.target}
        />
      );
    },
  },
  sourceHandle: {
    priority: 4,
    render: ({ handleChange, values, getOptions }: any) => {
      return (
        <Select
          label={"Source handle:"}
          onChange={handleChange}
          defaultValue={values.sourceHandle}
          getOptions={getOptions?.sourceHandle}
        />
      );
    },
  },
  markerStart: {
    priority: 5,
    render: ({ handleChange, values, getOptions }: any) => {
      return (
        <Select
          label={"Marker start:"}
          onChange={handleChange}
          defaultValue={values.markerStart}
          getOptions={getOptions?.markerStart}
        />
      );
    },
  },
  markerEnd: {
    priority: 6,
    render: ({ handleChange, values, getOptions }: any) => {
      return (
        <Select
          label={"Marker end:"}
          onChange={handleChange}
          defaultValue={values.markerEnd}
          getOptions={getOptions?.markerEnd}
        />
      );
    },
  },
  className: {
    priority: 7,
    render: ({ handleChange, values, getOptions }: any) => {
      return (
        <Select
          label={"Classname:"}
          onChange={handleChange}
          defaultValue={values.className}
          getOptions={getOptions?.className}
        />
      );
    },
  },
  animated: {
    priority: 8,
    render: ({ handleChange, values, getOptions }: any) => {
      return (
        <RadioCheckbox
          label={"Animated:"}
          onChange={handleChange}
          defaultValue={values.animated}
          getOptions={getOptions?.animated}
        />
      );
    },
  },
};

export default StepEdgeModel;
