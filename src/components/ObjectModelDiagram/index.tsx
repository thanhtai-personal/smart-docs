import React, { forwardRef, useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
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
import useInitialReactFlow from "@/hooks/useInitialReactFlow";
import useFormInModalLogic from "@/hooks/useFormInModalLogic";

const minimapStyle = {
  height: 120,
};

const ObjectModelDiagram = forwardRef((props: any, ref: any) => {
  const {
    nodes: _nodes,
    edges: _edges,
    onUpdateJson = () => {},
    onOpenJson,
    openJson,
  } = props;

  const [nodeType, setNodeType] = useState(NODE_TYPE.EXPAND_FRAME as string);
  const [edgeType, setEdgeType] = useState(EDGE_TYPE.DEFAULT as string);
  const [onConnect, onInit, nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange] = useInitialReactFlow({
    nodes: _nodes,
    edges: _edges,
    ref: ref,
  });

  const [nodeFormData, nodeFormEvents] = useFormInModalLogic({
    formData: {
      nodes,
      edges
    },
    onUpdateFormData: (changes: Array<any>) => {
      onNodesChange(changes);
      setTimeout(() => {
        onUpdateJson({
          nodes,
          edges,
        });
      }, 0);
    },
    onSubmit: (values: any) => {
      nodeTypesMapping[nodeType].onSubmit(values, async (nodeData: any) => {
        await onUpdateJson({
          nodes: [..._nodes, nodeData],
          edges: _edges,
        });
      });
    },
    onOpenModal: () => {
      edgeFormEvents && edgeFormEvents.handleCloseModal && edgeFormEvents.handleCloseModal();
    },
  });

  const [edgeFormData, edgeFormEvents] = useFormInModalLogic({
    formData: {
      nodes: _nodes,
      edges: _edges
    },
    onUpdateFormData: (changes: Array<any>) => {
      onEdgesChange(changes);
      setTimeout(() => {
        onUpdateJson({
          nodes: _nodes,
          edges: _edges,
        });
      }, 0);
    },
    onSubmit: (values: any) => {
      nodeTypesMapping[nodeType].onSubmit(values, async (nodeData: any) => {
        await onUpdateJson({
          nodes: [..._nodes, nodeData],
          edges: _edges,
        });
      });
    },
    onOpenModal: () => {
      nodeFormEvents && nodeFormEvents.handleCloseModal && nodeFormEvents.handleCloseModal();
    },
  });


  return (
    <>
      <DrawingTool
        addNode={nodeFormEvents.handleAdd}
        editNode={nodeFormEvents.handleEdit}
        addEdge={edgeFormEvents.handleAdd}
        editEdge={edgeFormEvents.handleEdit}
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
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
      <ReactModal isOpen={nodeFormData.isOpenModal} onClose={nodeFormEvents.handleCloseModal}>
        <Form
          title={nodeTypesMapping[nodeType].createTitle}
          values={nodeFormData.values}
          validate={nodeTypesMapping[nodeType].validate}
          model={nodeTypesMapping[nodeType].model}
          onSubmit={nodeFormEvents.handleSubmit}
          getOptions={nodeTypesMapping[nodeType].getOptions}
          dataSelected={{
            nodes,
            edges,
            supportedNodeClassname: [
              {
                key: "heading",
                value: "heading",
                label: "heading",
              },
            ],
          }}
          onUpdateForm={nodeFormEvents.handleUpdateData}
          onRelatedUpdate={nodeFormEvents.handleUpdateRelatedFields}
          onErrorUpdate={nodeFormEvents.handleUpdateErrors}
        />
      </ReactModal>
      <ReactModal isOpen={edgeFormData.isOpenModal} onClose={edgeFormEvents.handleCloseModal}>
        <Form
          title={edgeTypesMapping[edgeType].createTitle}
          values={edgeFormData.values}
          validate={edgeTypesMapping[edgeType].validate}
          model={edgeTypesMapping[edgeType].model}
          onSubmit={edgeFormEvents.handleSubmit}
          getOptions={edgeTypesMapping[edgeType].getOptions}
          dataSelected={{
            nodes,
            edges,
            supportedNodeClassname: [
              {
                key: "heading",
                value: "heading",
                label: "heading",
              },
            ],
          }}
          onUpdateForm={edgeFormEvents.handleUpdateData}
          onRelatedUpdate={edgeFormEvents.handleUpdateRelatedFields}
          onErrorUpdate={edgeFormEvents.handleUpdateErrors}
        />
      </ReactModal>
    </>
  );
});

export default ObjectModelDiagram;
