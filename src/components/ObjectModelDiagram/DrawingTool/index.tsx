import { nodeTypesMapping } from "@/utils/constants";
import React, { useState } from "react";

interface DrawingToolProps {
  addNode: any
}

const DrawingTool: React.FC<DrawingToolProps> = (props: DrawingToolProps) => {
  const { addNode } = props;
  const [nodeType, setNodeType] = useState("expandFrame")

  const handleAddNode = () => {
    addNode && addNode(nodeType)
  }

  const handleChangeNodeType = (e: any) => {
    setNodeType(e.target.value)
  }

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        top: "24px",
        left: "24px",
        minHeight: "24px",
        background: "rgba(0,0,0, 0.7)",
        zIndex: 99999,
        padding: "8px",
        border: "solid 1px rgba(0,0,0, 0.75)",
        borderRadius: "4px",
      }}
    >
      <span style={{ color: "#fff" }}>Select node type:&nbsp;</span>
      <select onChange={handleChangeNodeType} value={nodeType}>
        {Object.keys(nodeTypesMapping).map(key => (
          <option key={key} value={key}>
            {nodeTypesMapping[key].name}
          </option>
        ))}
      </select>
      <button style={{ color: 'steelblue', marginLeft: "8px" }} onClick={handleAddNode}>Add</button>
    </div>
  );
};

export default DrawingTool;
