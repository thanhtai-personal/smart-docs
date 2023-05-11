import React, { forwardRef, useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  nodeTypes,
  nodeTypesMapping,
  edgeTypes,
  edgeTypesMapping,
} from "@/utils/constants";
import DrawingTool from "./DrawingTool";
import ReactModal from "../Modal";
import Form from "../Form";
import { NODE_TYPE } from "@/utils/constants";
import { EDGE_TYPE } from "@/utils/constants";

const minimapStyle = {
  height: 120,
};

const ObjectModelDiagram = forwardRef((props: any, ref: any) => {
  const {
    nodes = [],
    edges = [],
    onUpdateJson = () => {},
    onOpenJson,
    openJson,
  } = props;
  const [_nodes, setNodes, onNodesChange] = useNodesState(nodes as Array<any>);
  const [_edges, setEdges, onEdgesChange] = useEdgesState(edges as Array<any>);
  const [openNodeModal, setOpenNodeModal] = useState(false);
  const [openEdgeModal, setOpenEdgeModal] = useState(false);
  const [nodeType, setNodeType] = useState(NODE_TYPE.EXPAND_FRAME as string);
  const [edgeType, setEdgeType] = useState(EDGE_TYPE.DEFAULT as string);
  const [initialNodeValues, setInitialNodeValues] = useState({});
  const [initialEdgeValues, setInitialEdgeValues] = useState({});

  const handleAddNode = (nodeType: string) => {
    setOpenEdgeModal(false);
    setOpenNodeModal(true);
    setNodeType(nodeType);
    setInitialNodeValues(nodeTypesMapping[nodeType].getInitialValues({}));
  };

  const handleEditNode = (node: any) => {
    setOpenEdgeModal(false);
    setOpenNodeModal(true);
    setNodeType(node.type);
    setInitialNodeValues(nodeTypesMapping[nodeType].getInitialValues(node));
  };

  const handleAddEdge = (edgeType: string) => {
    setOpenNodeModal(false);
    setOpenEdgeModal(true);
    setEdgeType(edgeType);
    setInitialEdgeValues(edgeTypesMapping[edgeType].getInitialValues({}));
  };

  const handleEditEdge = (edge: any) => {
    setOpenNodeModal(false);
    setOpenEdgeModal(true);
    setEdgeType(edge.type || EDGE_TYPE.DEFAULT);
    setInitialEdgeValues(edgeTypesMapping[edgeType].getInitialValues(edge));
  };

  const handleCloseNodeModal = () => {
    setOpenNodeModal(false);
    setInitialNodeValues({});
  };

  const handleCloseEdgeModal = () => {
    setOpenEdgeModal(false);
    setInitialEdgeValues({});
  };

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onInit = (reactFlowInstance: any) => {
    if (ref) {
      ref.current = reactFlowInstance;
    }
    reactFlowInstance.zoomTo(0.68);
  };

  useEffect(() => {
    if (nodes && nodes.length > 0) {
      setNodes(nodes);
    }
  }, [nodes]);

  useEffect(() => {
    if (edges && edges.length > 0) {
      setEdges(
        edges.map((edge: any) => ({
          ...edge,
          markerEnd: {
            type: "arrowclosed",
          },
        }))
      );
    }
  }, [edges]);

  const edgesWithUpdatedTypes = _edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node: any) => node?.type === "custom")?.data
        .selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

  const handleNodesChange = useCallback(
    (changes: Array<any>) => {
      onNodesChange(changes);
      setTimeout(() => {
        onUpdateJson({
          nodes: _nodes,
          edges: _edges,
        });
      }, 0);
    },
    [_nodes, _edges]
  );

  const handleEdgesChange = useCallback(
    (changes: Array<any>) => {
      onEdgesChange(changes);
      setTimeout(() => {
        onUpdateJson({
          nodes: _nodes,
          edges: _edges,
        });
      }, 0);
    },
    [_nodes, _edges]
  );

  const handleCreateNode = (values: any) => {
    nodeTypesMapping[nodeType].onSubmit(values, async (nodeData: any) => {
      await onUpdateJson({
        nodes: [..._nodes, nodeData],
        edges: _edges,
      });
      setOpenNodeModal(false);
    });
  };

  const handleCreateEdge = (values: any) => {
    edgeTypesMapping[edgeType].onSubmit(values, async (edgeData: any) => {
      await onUpdateJson({
        edges: [..._edges, edgeData],
        nodes: _nodes,
      });
      setOpenEdgeModal(false);
    });
  };

  return (
    <>
      <DrawingTool
        addNode={handleAddNode}
        editNode={handleEditNode}
        addEdge={handleAddEdge}
        editEdge={handleEditEdge}
        openJson={openJson}
        onOpenJson={onOpenJson}
        onUpdateJson={onUpdateJson}
        nodes={_nodes}
        edges={_edges}
        setNodes={setNodes}
        setEdges={setEdges}
      />
      <ReactFlow
        nodes={_nodes}
        edges={edgesWithUpdatedTypes}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background color="#000" gap={16} />
      </ReactFlow>
      <ReactModal isOpen={openNodeModal} onClose={handleCloseNodeModal}>
        <Form
          title={nodeTypesMapping[nodeType].createTitle}
          initialValues={initialNodeValues}
          validate={nodeTypesMapping[nodeType].validate}
          model={nodeTypesMapping[nodeType].model}
          onSubmit={handleCreateNode}
          getOptions={nodeTypesMapping[nodeType].getOptions}
          dataSelected={{
            nodes: _nodes,
            edges: _edges,
            supportedNodeClassname: [
              {
                key: "heading",
                value: "heading",
                label: "heading",
              },
            ],
          }}
        />
      </ReactModal>
      <ReactModal isOpen={openEdgeModal} onClose={handleCloseEdgeModal}>
        <Form
          title={edgeTypesMapping[edgeType]?.createTitle}
          initialValues={initialEdgeValues}
          validate={edgeTypesMapping[edgeType]?.validate}
          model={edgeTypesMapping[edgeType]?.model}
          onSubmit={handleCreateEdge}
          getOptions={edgeTypesMapping[edgeType]?.getOptions}
          dataSelected={{
            nodes: _nodes,
            edges: _edges,
            supportedEdgeClassname: [],
            markerTypes: [
              {
                key: "none",
                value: "",
                label: "None",
              },
              {
                key: MarkerType.Arrow,
                value: MarkerType.Arrow,
                label: MarkerType.Arrow,
              },
              {
                key: MarkerType.ArrowClosed,
                value: MarkerType.ArrowClosed,
                label: MarkerType.ArrowClosed,
              },
            ],
          }}
        />
      </ReactModal>
    </>
  );
});

export default ObjectModelDiagram;
