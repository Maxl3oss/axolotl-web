'use client';

import { memo } from 'react';
import { Handle, Position, NodeResizer, NodeProps } from 'reactflow';

interface ResizerNodeData {
  label: string;
}

function ResizerNode({ data }: NodeProps<ResizerNodeData>) {
  return (
    <>
      <NodeResizer minWidth={50} minHeight={50} />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'space-evenly',
          left: 0,
        }}
      >
        <Handle
          style={{ position: 'relative', left: 0, transform: 'none' }}
          id="a"
          type="source"
          position={Position.Bottom}
        />
        <Handle
          style={{ position: 'relative', left: 0, transform: 'none' }}
          id="b"
          type="source"
          position={Position.Bottom}
        />
      </div>
    </>
  );
}

ResizerNode.displayName = 'ResizerNode';

export default memo(ResizerNode);