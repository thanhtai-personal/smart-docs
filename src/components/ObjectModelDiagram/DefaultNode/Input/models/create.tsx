const InputModel = {
  id: {
    priority: 1,
    render: ({ handleChange }: any) => {
      return (
        <input
          name="id"
          placeholder="Enter unique id"
          onChange={handleChange}
        />
      );
    },
  },
  label: {
    priority: 2,
    render: ({ handleChange }: any) => {
      return (
        <input name="label" onChange={handleChange} placeholder="Enter label" />
      );
    },
  },
  className: {
    priority: 3,
    render: ({ handleChange }: any) => {
      return (
        <input
          name="className"
          onChange={handleChange}
          placeholder="Enter className (heading)"
        />
      );
    },
  },
};

export default InputModel;
