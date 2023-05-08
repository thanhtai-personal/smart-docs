import ExpandFrameNode from "@/components/ObjectModelDiagram/CustomNode/ExpandFrameNode";
import MediaCardNode from "@/components/ObjectModelDiagram/CustomNode/MediaCardNode";
import ExpandFrameNodeCreateModel from "@/components/ObjectModelDiagram/CustomNode/ExpandFrameNode/models/create";
import MediaCardNodeCreateModel from "@/components/ObjectModelDiagram/CustomNode/MediaCardNode/models/create";
import { NamedColorspace } from "@textea/json-viewer";
import InputModel from "@/components/ObjectModelDiagram/DefaultNode/Input/models/create";

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
          selected: false,
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
    model: InputModel,
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
          selected: false,
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

export const jsonViewerTheme: NamedColorspace = {
  scheme: "Ocean",
  author: "Chris Kempson (http://chriskempson.com)",
  base00: "#2b303b",
  base01: "#343d46",
  base02: "#4f5b66",
  base03: "#65737e",
  base04: "#a7adba",
  base05: "#c0c5ce",
  base06: "#dfe1e8",
  base07: "#eff1f5",
  base08: "#bf616a",
  base09: "#d08770",
  base0A: "#ebcb8b",
  base0B: "#a3be8c",
  base0C: "#96b5b4",
  base0D: "#8fa1b3",
  base0E: "#b48ead",
  base0F: "#ab7967",
};
