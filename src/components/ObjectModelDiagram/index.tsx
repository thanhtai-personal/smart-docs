import React, { forwardRef, useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes, nodeTypesMapping } from "@/utils/constants";
import DrawingTool from "./DrawingTool";
import ReactModal from "../Modal";
import Form from "../Form";

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
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [nodeType, setNodeType] = useState("expandFrame");

  const handleAddNode = (nodeType: string) => {
    setOpenCreateModal(true);
    setNodeType(nodeType);
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

  const handleCreateFormSubmit = (values: any) => {
    nodeTypesMapping[nodeType].onSubmit(values, async (nodeData: any) => {
      await onUpdateJson({
        nodes: [..._nodes, nodeData],
        edges: _edges,
      });
      setOpenCreateModal(false);
    });
  };

  return (
    <>
      <DrawingTool
        addNode={handleAddNode}
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
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background color="#000" gap={16} />
      </ReactFlow>
      <ReactModal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      >
        <Form
          title={nodeTypesMapping[nodeType].createTitle}
          initialValues={nodeTypesMapping[nodeType].initialValues}
          validate={nodeTypesMapping[nodeType].validate}
          model={nodeTypesMapping[nodeType].model}
          onSubmit={handleCreateFormSubmit}
          getOptions={nodeTypesMapping[nodeType].getOptions}
          dataSelected={{ nodes: _nodes, edges: _edges }}
        />
      </ReactModal>
    </>
  );
});

export default ObjectModelDiagram;
