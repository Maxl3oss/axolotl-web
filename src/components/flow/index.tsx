'use client';

import React, { Fragment, useCallback } from 'react';
import ReactFlow, { addEdge, Controls, Background, useNodesState, useEdgesState, Node, Edge, Connection, NodeTypes, EdgeTypes, useReactFlow } from 'reactflow';
import {
  nodes as initialNodes, edges as initialEdges,
} from './initial-elements';
import AnnotationNode from './node/AnnotationNode';
import ToolbarNode from './node/ToolbarNode';
import ResizerNode from './node/ResizerNode';
import CircleNode from './node/CircleNode';
import TextNode from './node/TextNode';
import ButtonEdge from './node/ButtonEdge';
import CustomNode from './node/CustomNode';
import Tools from './tools/Tools';
import 'reactflow/dist/style.css';
import './overview.css';
import YoutubeNode from './node/YoutubeNode';

const nodeTypes: NodeTypes = {
  annotation: AnnotationNode,
  tools: ToolbarNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textInput: TextNode,
  customNode: CustomNode,
  youtube: YoutubeNode,
};
export type TypeNodeName = "youtube" | "customNode" | "annotation" | "tools" | "resizer" | "circle" | "textInput"

const edgeTypes: EdgeTypes = {
  button: ButtonEdge,
};

const OverviewFlow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowInstance = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const addNode = (typeNode: TypeNodeName) => {
    const viewport = reactFlowInstance.getViewport();
    const zoom = viewport.zoom;
    const currentX = viewport.x;
    const currentY = viewport.y;

    // Calculate the center position in the current viewport
    const centerX = (window.innerWidth / 2) / zoom + currentX;
    const centerY = (window.innerHeight / 2) / zoom + currentY;

    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      type: typeNode,
      data: {
        link: "",
        label: `${typeNode} ${nodes.length + 1}`,
        onDelete: () => deleteNode((nodes.length + 1).toString()),
        onChangeText: (newLabel: string) => updateNodeLabel((nodes.length + 1).toString(), newLabel),
      },
      position: { x: centerX, y: centerY },
    };

    setNodes((nds) => nds.concat(newNode));

    // Center the viewport on the newly added node
    const newViewportX = centerX - (window.innerWidth / 2) / zoom;
    const newViewportY = centerY - (window.innerHeight / 2) / zoom;

    reactFlowInstance.setViewport({
      x: newViewportX,
      y: newViewportY,
      zoom: zoom,
    });
  };

  // remove node
  const deleteNode = (id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  // rename label
  const updateNodeLabel = (id: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node
      )
    );
  };

  return (
    <Fragment>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(value) => {
          onNodesChange(value);
          console.log(value);
        }}
        onEdgesChange={(value) => {
          onEdgesChange(value);
          console.log(value);
        }}
        onConnect={(value) => {
          onConnect(value);
          console.log(value);
        }}
        fitView={true}
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        className="overview"
      >
        <Controls />
        <Background />
        <Tools addNode={addNode} />
      </ReactFlow>
    </Fragment>
  );
};

export default OverviewFlow;