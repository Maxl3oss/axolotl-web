import { Badge } from '@/components/ui/badge';
import { PenIcon, XCircle } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps, NodeResizer, NodeToolbar } from 'reactflow';

interface CustomNodeData {
  label: string;
  onDelete: () => void;
  onChangeText: (newLabel: string) => void;
}

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(data.label);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleLabelClick = () => {
    setIsEditing(true);
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedLabel(event.target.value);
  };

  const handleLabelBlur = () => {
    setIsEditing(false);
    data.onChangeText(editedLabel);
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing, editedLabel]);

  return (
    <div className="custom-node flex flex-1 p-2 w-full">
      <NodeToolbar
        className="bg-transparent space-x-1"
        // isVisible={data.forceToolbarVisible()}
        position={Position.Top}
      >
        <Badge className="cursor-pointer" onClick={() => setIsEditing(true)}>
          <PenIcon className="icon-sm text-secondary hover:text-green-500" />
        </Badge>
        <Badge className="cursor-pointer" onClick={data.onDelete}>
          <XCircle className="icon-sm text-secondary hover:text-red-500" />
        </Badge>
      </NodeToolbar>
      <NodeResizer maxHeight={500} minWidth={100} minHeight={50} />
      <Handle type="target" position={Position.Top} />
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={editedLabel}
          onChange={handleLabelChange}
          onBlur={handleLabelBlur}
          autoFocus
          className="input-clear w-full resize-none overflow-hidden"
          style={{ height: 'auto', width: '100%' }}
        />
      ) : (
        <div onClick={handleLabelClick} className="whitespace-normal text-justify break-words break-all">{data.label}</div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;