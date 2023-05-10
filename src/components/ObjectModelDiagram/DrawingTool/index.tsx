import { nodeTypesMapping } from "@/utils/constants";
import React, { useMemo, useState } from "react";

interface DrawingToolProps {
  addNode: any;
  editNode: any;
  addEdge: any;
  editEdge: any;
  openJson: any;
  onOpenJson: any;
  onUpdateJson: any;
  nodes: any;
  edges: any;
  setNodes: any;
  setEdges: any;
}

const DrawingTool: React.FC<DrawingToolProps> = (props: DrawingToolProps) => {
  const {
    addNode,
    editNode,
    addEdge,
    editEdge,
    openJson,
    onOpenJson,
    onUpdateJson,
    nodes,
    edges,
    setNodes,
    setEdges,
  } = props;
  const [nodeType, setNodeType] = useState("expandFrame");
  // const [edgeType, setEdgeType] = useState("");

  const handleAddNode = () => {
    addNode && addNode(nodeType);
  };

  // const handleAddEdge = () => {
  //   addEdge && addEdge(edgeType);
  // };

  const handleOpenEdit = () => {
    const selectedNode = (
      (nodes || []).find((_node: any) => _node.selected)
    );
    const selectedEdge = (
      (edges || []).find((_edge: any) => _edge.selected)
    );
    selectedNode && editNode && editNode(selectedNode);
    // selectedEdge && editEdge && editEdge(selectedEdge);
  }

  const handleChangeNodeType = (e: any) => {
    setNodeType(e.target.value);
  };

  const handleDeleteSeleted = () => {
    const selectedId = (
      (nodes || []).find((_node: any) => _node.selected) ||
      (edges || []).find((_edge: any) => _edge.selected)
    ).id;
    const newEdges = (edges || []).filter((_edge: any) => !_edge.selected && _edge.source !== selectedId && _edge.target !== selectedId)
    const newNodes = (nodes || []).filter((_node: any) => !_node.selected).map((_node: any) => {
      if (_node.parentNode === selectedId) {
        return {
          ..._node,
          parentNode: ""
        }
      } else {
        return _node
      }
    })
    setEdges(newEdges);
    setNodes(newNodes);

    onUpdateJson({
      nodes: newNodes,
      edges: newEdges,
    });
  };

  const openEditTool = useMemo(
    () =>
      nodes.find((_node: any) => _node.selected) ||
      edges.find((_edge: any) => _edge.selected),
    [nodes, edges]
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        background: "rgba(0,0,0, 0.125)",
        padding: "4px",
        top: "24px",
        left: "24px",
        minHeight: "24px",
        zIndex: 99999,
        width: "calc(100vw - 50px)",
        borderRadius: "4px",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "8px",
          background: "rgba(0,0,0, 0.7)",
          border: "solid 1px rgba(0,0,0, 0.75)",
          borderRadius: "4px",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#fff" }}>Select node type:&nbsp;</span>
        <select onChange={handleChangeNodeType} value={nodeType}>
          {Object.keys(nodeTypesMapping).map((key) => (
            <option key={key} value={key}>
              {nodeTypesMapping[key].name}
            </option>
          ))}
        </select>
        <button
          style={{ marginLeft: "8px", padding: "8px" }}
          onClick={handleAddNode}
        >
          <i
            className="fa-solid fa-plus"
            style={{
              color: "#fff",
            }}
          ></i>
        </button>
      </div>
      {openEditTool && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            minWidth: 300,
          }}
        >
          <i
            title="delete"
            className="fa-sharp fa-solid fa-trash fa-xl button"
            style={{ color: "rgba(225,20,0, 1)" }}
            onClick={handleDeleteSeleted}
          ></i>
          <i
            title="edit"
            className="fa-solid fa-pen-to-square fa-xl button"
            style={{ color: "rgba(6,105,234, 1)", marginLeft: "16px" }}
            onClick={handleOpenEdit}
          ></i>
        </div>
      )}
      <div>
        {openJson && (
          <button
            style={{
              padding: "8px",
              background: "steelblue",
              borderRadius: "4px",
              color: "#fff",
            }}
            onClick={() => onOpenJson && onOpenJson(false)}
          >
            <i className="fa-sharp fa-solid fa-xmark"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default DrawingTool;
