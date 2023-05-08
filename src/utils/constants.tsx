import ExpandFrameNode from "@/components/ObjectModelDiagram/CustomNode/ExpandFrameNode";
import MediaCardNode from "@/components/ObjectModelDiagram/CustomNode/MediaCardNode";
import ExpandFrameNodeCreateModel from "@/components/ObjectModelDiagram/CustomNode/ExpandFrameNode/models/create";
import MediaCardNodeCreateModel from "@/components/ObjectModelDiagram/CustomNode/MediaCardNode/models/create";

export const nodeTypes: any = {
  expandFrame: ExpandFrameNode,
  mediaCard: MediaCardNode,
};

export const nodeTypesMapping: any = {
  expandFrame: {
    component: ExpandFrameNode,
    name: "Expandable",
    createTitle: "Create expandable node",
    initialValues: {
      id: "",
      className: "",
      content: "",
    },
    validate: (values: any) => !!values.id,
    model: ExpandFrameNodeCreateModel,
    onSubmit: (values: any, addNodeFuntion: Function) => {
      addNodeFuntion &&
        addNodeFuntion({
          id: values.id,
          type: "expandFrame",
          parentNode: "set-up-environment",
          data: {
            label: values.label,
            content: values.content,
          },
          position: {
            x: 40,
            y: 40,
          },
          selected: false,
          positionAbsolute: {
            x: 40,
            y: 40,
          },
          dragging: true,
          width: 267,
          height: 159,
        });
    },
  },
  mediaCard: {
    component: MediaCardNode,
    name: "Media card",
    createTitle: "Media card node",
    initialValues: {
      id: "",
      label: "",
      mdContent: "",
    },
    validate: (values: any) => !!values.id,
    model: MediaCardNodeCreateModel,
    onSubmit: (values: any, addNodeFuntion: Function) => {
      addNodeFuntion &&
        addNodeFuntion({
          id: values.id,
          type: "mediaCard",
          data: {
            label: values.label,
            content: "",
            images: [],
            videos: [],
            mdContent: values.mdContent,
          },
          position: {
            x: 40,
            y: 40,
          },
          selected: true,
          positionAbsolute: {
            x: 40,
            y: 40,
          },
          dragging: false,
          width: 350,
          height: 350,
        });
    },
  },
  input: {
    name: "Input",
    createTitle: "Input node",
    initialValues: {
      id: "",
      label: "",
      mdContent: "",
    },
    validate: (values: any) => !!values.id,
    model: {
      id: {
        priority: 1,
        render: ({
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
            <input
              name="label"
              onChange={handleChange}
              placeholder="Enter label"
            />
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
    },
    onSubmit: (values: any, addNodeFuntion: Function) => {
      addNodeFuntion &&
        addNodeFuntion({
          id: values.id,
          type: "input",
          data: {
            label: values.label,
          },
          className: values.className,
          position: {
            x: 40,
            y: 40,
          },
          selected: true,
          positionAbsolute: {
            x: 40,
            y: 40,
          },
          dragging: false,
          width: 350,
          height: 350,
        });
    },
  },
};
