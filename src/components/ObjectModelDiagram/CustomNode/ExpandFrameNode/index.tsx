import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

function ExpandFrameNode(props: any) {
  const { id, data } = props

  const [open, setOpen] = useState(false)

  return (
    <div className="custom-node expand-frame" id={`node-frame-${id}`}>
      <div className="custom-node__header" onClick={() => setOpen((prev) => !prev)}>
        {data.label}
        <span style={{ marginLeft: "10px", transform: open ? "rotate(180deg)" : "rotate(90deg)", transitionDuration: "0.2s" }}>&#94;</span>
      </div>
      <div className="custom-node__body expand-anim" dangerouslySetInnerHTML={{ __html: data.content }}
        style={{ height: open ? "auto" : "0px", padding: open ? "10px" : "0", overflow: "hidden", background: "rgba(155,255,155, 0.45)" }}
      >
      </div>
      <Handle type="source" position={Position.Bottom}/>
      <Handle type="target" position={Position.Top}/>
    </div>
  );
}

export default memo(ExpandFrameNode);
