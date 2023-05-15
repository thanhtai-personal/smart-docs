import React, { forwardRef, useMemo, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
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
  const [
    { onConnect, onInit },
    { nodes, edges },
    { setNodes, setEdges, onNodesChange, onEdgesChange },
  ] = useInitialReactFlow({
    nodes: _nodes || [],
    edges: _edges || [],
    onChange: (newData: any) => {
      onUpdateJson(newData);
    },
    ref: ref,
  });

  const mappingNodeSubmitData = useMemo(() => {
    return nodeTypesMapping[nodeType].mappingSubmitData ? nodeTypesMapping[nodeType].mappingSubmitData : ((values: any) => values)
  }, [nodeType])

  const mappingEdgeSubmitData = useMemo(() => {
    return edgeTypesMapping[edgeType].mappingSubmitData ? edgeTypesMapping[edgeType].mappingSubmitData : ((values: any) => values)
  }, [edgeType])

  const [nodeFormData, nodeFormEvents] = useFormInModalLogic({
    formData: {
      nodes,
      edges
    },
    onUpdateFormData: (changes: Array<any>) => {
      onNodesChange && onNodesChange(changes);
      setTimeout(() => {
        onUpdateJson({
          nodes,
          edges,
        });
      }, 0);
    },
    onSubmit: (newNode: any) => {
      onUpdateJson({
        edges: edges,
        nodes: [...(nodes || []), newNode],
      })
    },
    onOpenModal: () => {
      edgeFormEvents && edgeFormEvents.handleCloseModal && edgeFormEvents.handleCloseModal();
    },
    mappingSubmitData: mappingNodeSubmitData
  });

  const [edgeFormData, edgeFormEvents] = useFormInModalLogic({
    formData: {
      nodes: _nodes,
      edges: _edges
    },
    onUpdateFormData: (changes: Array<any>) => {
      onEdgesChange && onEdgesChange(changes);
    },
    onSubmit: (newEdge: any) => {
      onUpdateJson({
        nodes: nodes,
        edges: [...(edges || []), newEdge],
      })
    },
    onOpenModal: () => {
      nodeFormEvents && nodeFormEvents.handleCloseModal && nodeFormEvents.handleCloseModal();
    },
    mappingSubmitData: mappingEdgeSubmitData
  });

  return (
    <>
      <DrawingTool
        addNode={(type: string) => {
          setNodeType(type);
          nodeFormEvents.handleOpenModal && nodeFormEvents.handleOpenModal({});
        }}
        editNode={(item: any) => {
          setNodeType(item.type);
          nodeFormEvents.handleOpenModal && nodeFormEvents.handleOpenModal(item);
        }}
        addEdge={(type: string) => {
          setEdgeType(type);
          edgeFormEvents.handleOpenModal && edgeFormEvents.handleOpenModal({});
        }}
        editEdge={(item: any) => {
          setEdgeType(item.type);
          edgeFormEvents.handleOpenModal && edgeFormEvents.handleOpenModal(item);
        }}
        openJson={openJson}
        onOpenJson={onOpenJson}
        onUpdateJson={onUpdateJson}
        nodes={nodes || []}
        edges={edges || []}
        setNodes={setNodes}
        setEdges={setEdges}
      />
      <ReactFlow
        nodes={nodes || []}
        edges={edges || []}
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
          errors={nodeFormData.errors}
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
          errors={edgeFormData.errors}
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
