import { nodeTypesMapping } from "@/utils/constants";
import React, { useState } from "react";

interface DrawingToolProps {
  addNode: any;
  openJson: any;
  onOpenJson: any;
}

const DrawingTool: React.FC<DrawingToolProps> = (props: DrawingToolProps) => {
  const { addNode, openJson, onOpenJson } = props;
  const [nodeType, setNodeType] = useState("expandFrame");

  const handleAddNode = () => {
    addNode && addNode(nodeType);
  };

  const handleChangeNodeType = (e: any) => {
    setNodeType(e.target.value);
  };

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
          Add
        </button>
      </div>
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
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default DrawingTool;
