const mediaCardModel = {
  id: {
    priority: 1,
    render: ({
      //   item,
      //   values,
      //   errors,
      //   touched,
      //   handleBlur,
      //   handleSubmit,
      //   isSubmitting,
      handleChange,
    }: any) => {
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
  mdContent: {
    priority: 3,
    render: ({ handleChange }: any) => {
      return (
        <textarea
          style={{ padding: "8px" }}
          rows={10}
          name="mdContent"
          onChange={handleChange}
          placeholder="Enter markdown content"
        />
      );
    },
  },
};

export default mediaCardModel;
