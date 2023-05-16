import ExpandFrameNode from "app/components/ObjectModelDiagram/CustomNode/ExpandFrameNode";
import MediaCardNode from "app/components/ObjectModelDiagram/CustomNode/MediaCardNode";
import ExpandFrameNodeCreateModel from "app/components/ObjectModelDiagram/CustomNode/ExpandFrameNode/models/create";
import MediaCardNodeCreateModel from "app/components/ObjectModelDiagram/CustomNode/MediaCardNode/models/create";
import { NamedColorspace } from "@textea/json-viewer";
import InputModel from "app/components/ObjectModelDiagram/DefaultNode/Input/models/create";
import OutputModel from "app/components/ObjectModelDiagram/DefaultNode/Output/models/create";
import DefaultModel from "app/components/ObjectModelDiagram/DefaultNode/Default/models/create";
import DefaultEdgeModel from "app/components/ObjectModelDiagram/DefaultEdge/Default/models/create";
import SmoothStepEdgeModel from "app/components/ObjectModelDiagram/DefaultEdge/SmoothStep/models/create";
import StepEdgeModel from "app/components/ObjectModelDiagram/DefaultEdge/StepEdge/models/create";
import StraightEdgeModel from "app/components/ObjectModelDiagram/DefaultEdge/StraightEdge/models/create";
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
    getOptions: {
      parentNode: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      className: (dataSelected: any) => () =>
        dataSelected.supportedNodeClassname || [],
    },
  }),
  input: makeNodeTypeMappingItem({
    name: "Input",
    createTitle: "Input node",
    model: InputModel,
    type: NODE_TYPE.INPUT,
    getOptions: {
      parentNode: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      className: (dataSelected: any) => () =>
        dataSelected.supportedNodeClassname || [],
    },
  }),
  outPut: makeNodeTypeMappingItem({
    name: "Output",
    createTitle: "Output node",
    model: OutputModel,
    type: NODE_TYPE.OUTPUT,
    getOptions: {
      parentNode: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      className: (dataSelected: any) => () =>
        dataSelected.supportedNodeClassname || [],
    },
  }),
  expandFrame: {
    component: ExpandFrameNode,
    name: "Expandable",
    createTitle: "Create expandable node",
    getOptions: {
      parentNode: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
    },
    getInitialValues: (nodeData: any) => ({
      id: nodeData.id || "",
      className: nodeData.className || "",
      content: nodeData.data?.content || "",
      label: nodeData.data?.label || "",
      targetPosition: nodeData.targetPosition || POSITION.TOP,
      sourcePosition: nodeData.sourcePosition || POSITION.BOTTOM,
      parentNode: nodeData.parentNode || "",
      selectable: nodeData.selectable || true,
      zIndex: nodeData.zIndex || 0,
      style: nodeData.style || "",
    }),
    validate: (values: any) => !!values.id,
    model: ExpandFrameNodeCreateModel,
    mappingSubmitData: (values: any) => ({
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
    }),
    mappingInitialValues: (node: any) => {
      return ({
        id: node.id,
        label: node.data?.label,
        content: node.data?.content || "",
        targetPosition: node.targetPosition,
        sourcePosition: node.sourcePosition,
        selectable: node.selectable,
        zIndex: node.zIndex,
        style: node.style,
      })
    }
  },
  mediaCard: {
    component: MediaCardNode,
    name: "Media card",
    createTitle: "Media card node",
    getOptions: {
      parentNode: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
    },
    getInitialValues: (nodeData: any) => {
      return {
        id: nodeData.id || "",
        label: nodeData.data?.label || "",
        mdContent: nodeData.data?.mdContent || "",
        targetPosition: nodeData.targetPosition || POSITION.TOP,
        sourcePosition: nodeData.sourcePosition || POSITION.BOTTOM,
        parentNode: nodeData.parentNode || "",
        selectable: nodeData.selectable || true,
        zIndex: nodeData.zIndex || 0,
        style: nodeData.style || "",
      };
    },
    validate: (values: any) => !!values.id,
    model: MediaCardNodeCreateModel,
    mappingSubmitData: (values: any) => ({
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
    }),
  },
  mappingInitialValues: (node: any) => {
    return ({
      id: node.id,
      label: node.data?.label,
      mdContent: node.data?.mdContent || "",
      targetPosition: node.targetPosition,
      sourcePosition: node.sourcePosition,
      selectable: node.selectable,
      zIndex: node.zIndex,
      style: node.style,
    })
  }
};

export const edgeTypesMapping: any = {
  default: makeEdgeMappingItem({
    name: "Default",
    createTitle: "Default edge",
    model: DefaultEdgeModel,
    edgeType: EDGE_TYPE.DEFAULT,
    getOptions: {
      source: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      target: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      sourceHandle: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      markerStart: (dataSelected: any) => () => dataSelected.markerTypes || [],
      markerEnd: (dataSelected: any) => () => dataSelected.markerTypes || [],
      className: (dataSelected: any) => () =>
        dataSelected.supportedEdgeClassname || [],
    },
  }),
  smoothStep: makeEdgeMappingItem({
    name: "Smooth step",
    createTitle: "Smooth step Edge",
    model: SmoothStepEdgeModel,
    edgeType: EDGE_TYPE.SMOOTHSTEP,
    getOptions: {
      source: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      target: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      sourceHandle: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      markerStart: (dataSelected: any) => () => dataSelected.markerTypes || [],
      markerEnd: (dataSelected: any) => () => dataSelected.markerTypes || [],
      className: (dataSelected: any) => () =>
        dataSelected.supportedEdgeClassname || [],
    },
  }),
  step: makeEdgeMappingItem({
    name: "Step",
    createTitle: "Step Edge",
    model: StepEdgeModel,
    edgeType: EDGE_TYPE.STEP,
    getOptions: {
      source: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      target: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      sourceHandle: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      markerStart: (dataSelected: any) => () => dataSelected.markerTypes || [],
      markerEnd: (dataSelected: any) => () => dataSelected.markerTypes || [],
      className: (dataSelected: any) => () =>
        dataSelected.supportedEdgeClassname || [],
    },
  }),
  straight: makeEdgeMappingItem({
    name: "Straight",
    createTitle: "Straight Edge",
    model: StraightEdgeModel,
    edgeType: EDGE_TYPE.STRAIGHT,
    getOptions: {
      source: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      target: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      sourceHandle: (dataSelected: any) => () =>
        (dataSelected.nodes || []).map((n: any) => ({
          key: n.id,
          value: n.id,
          label: n.name || n.id,
        })),
      markerStart: (dataSelected: any) => () => dataSelected.markerTypes || [],
      markerEnd: (dataSelected: any) => () => dataSelected.markerTypes || [],
      className: (dataSelected: any) => () =>
        dataSelected.supportedEdgeClassname || [],
    },
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
