'use client';

import { memo, useState } from 'react';
import { Handle, Position, NodeToolbar, NodeProps } from 'reactflow';

const labelStyle: React.CSSProperties = {
  position: 'absolute',
  color: '#555',
  bottom: -15,
  fontSize: 8,
};

interface ToolbarNodeData {
  label: string;
}

function ToolbarNode({ data }: NodeProps<ToolbarNodeData>) {
  const [emoji, setEmoji] = useState<string>('🚀');

  return (
    <>
      <NodeToolbar isVisible={true}>
        <button onClick={() => setEmoji('🚀')}>🚀</button>
        <button onClick={() => setEmoji('🔥')}>🔥</button>
        <button onClick={() => setEmoji('✨')}>✨</button>
      </NodeToolbar>
      <div style={{ padding: '10px 20px' }}>
        <div>{emoji}</div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div style={labelStyle}>{data.label}</div>
    </>
  );
}

ToolbarNode.displayName = 'ToolbarNode';

export default memo(ToolbarNode);