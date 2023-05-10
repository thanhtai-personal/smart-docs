import ExpandFrameNode from "@/components/ObjectModelDiagram/CustomNode/ExpandFrameNode";
import MediaCardNode from "@/components/ObjectModelDiagram/CustomNode/MediaCardNode";
import ExpandFrameNodeCreateModel from "@/components/ObjectModelDiagram/CustomNode/ExpandFrameNode/models/create";
import MediaCardNodeCreateModel from "@/components/ObjectModelDiagram/CustomNode/MediaCardNode/models/create";
import { NamedColorspace } from "@textea/json-viewer";
import InputModel from "@/components/ObjectModelDiagram/DefaultNode/Input/models/create";
import OutputModel from "@/components/ObjectModelDiagram/DefaultNode/Output/models/create";
import DefaultModel from "@/components/ObjectModelDiagram/DefaultNode/Default/models/create";
import DefaultEdgeModel from "@/components/ObjectModelDiagram/DefaultEdge/Default/models/create";
import SmoothStepEdgeModel from "@/components/ObjectModelDiagram/DefaultEdge/SmoothStep/models/create";
import StepEdgeModel from "@/components/ObjectModelDiagram/DefaultEdge/StepEdge/models/create";
import StraightEdgeModel from "@/components/ObjectModelDiagram/DefaultEdge/StraightEdge/models/create";
import {
  makeEdgeMappingItem,
  makeNodeTypeMappingItem,
  uppercaseFirstLetter,
} from "./helper";

//enum
export enum NODE_TYPE {
  DEFAULT = "default",
  INPUT = "input",
  OUTPUT = "output",
  EXPAND_FRAME = "expandFrame",
  MEDIA_CARD = "mediaCard",
}

export enum EDGE_TYPE {
  DEFAULT = "default",
  STEP = "step",
  SMOOTHSTEP = "smoothstep",
  STRAIGHT = "straight",
}

//end enum
export const POSITION: any = {
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  BOTTOM: "bottom",
};

export const nodeTypes: any = {
  expandFrame: ExpandFrameNode,
  mediaCard: MediaCardNode,
};

export const edgeTypes: any = {};

export const nodeTypesMapping: any = {
  default: makeNodeTypeMappingItem({
    name: "Default",
    createTitle: "Default node",
    model: DefaultModel,
    type: NODE_TYPE.DEFAULT,
  }),
  input: makeNodeTypeMappingItem({
    name: "Input",
    createTitle: "Input node",
    model: InputModel,
    type: NODE_TYPE.INPUT,
  }),
  outPut: makeNodeTypeMappingItem({
    name: "Output",
    createTitle: "Output node",
    model: OutputModel,
    type: NODE_TYPE.OUTPUT,
  }),
  expandFrame: {
    component: ExpandFrameNode,
    name: "Expandable",
    createTitle: "Create expandable node",
    getInitialValues: (nodeData: any) => ({
      id: nodeData.id || "",
      className: nodeData.className || "",
      content: nodeData.data?.content || "",
      targetPosition: nodeData.targetPosition || POSITION.TOP,
      sourcePosition: nodeData.sourcePosition || POSITION.BOTTOM,
      parentNode: nodeData.parentNode || "",
      selectable: nodeData.selectable || true,
      zIndex: nodeData.zIndex || 0,
      style: nodeData.style || "",
    }),
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
          targetPosition: values.targetPosition,
          sourcePosition: values.sourcePosition,
          selectable: values.selectable,
          zIndex: values.zIndex,
          style: values.style,
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
    getInitialValues: (nodeData: any) => ({
      id: nodeData.id || "",
      label: nodeData.label || "",
      mdContent: nodeData.data?.mdContent || "",
      targetPosition: nodeData.targetPosition || POSITION.TOP,
      sourcePosition: nodeData.sourcePosition || POSITION.BOTTOM,
      parentNode: nodeData.parentNode || "",
      selectable: nodeData.selectable || true,
      zIndex: nodeData.zIndex || 0,
      style: nodeData.style || "",
    }),
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
          targetPosition: values.targetPosition,
          sourcePosition: values.sourcePosition,
          selectable: values.selectable,
          zIndex: values.zIndex,
          style: values.style,
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

export const edgeTypesMapping: any = {
  default: makeEdgeMappingItem({
    name: "Default",
    createTitle: "Default edge",
    model: DefaultEdgeModel,
    edgeType: EDGE_TYPE.DEFAULT,
  }),
  smoothStep: makeEdgeMappingItem({
    name: "Smooth step",
    createTitle: "Smooth step Edge",
    model: SmoothStepEdgeModel,
    edgeType: EDGE_TYPE.SMOOTHSTEP,
  }),
  step: makeEdgeMappingItem({
    name: "Step",
    createTitle: "Step Edge",
    model: StepEdgeModel,
    edgeType: EDGE_TYPE.STEP,
  }),
  straight: makeEdgeMappingItem({
    name: "Straight",
    createTitle: "Straight Edge",
    model: StraightEdgeModel,
    edgeType: EDGE_TYPE.STRAIGHT,
  }),
};

export const positionOptions = Object.keys(POSITION).map((key) => ({
  key: key,
  value: POSITION[key],
  name: uppercaseFirstLetter(POSITION[key]),
}));

export const jsonViewerTheme: NamedColorspace = {
  scheme: "default",
  author: "TTTran",
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
