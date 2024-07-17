'use client';

import { Input } from '@/components/ui/input';
import React, { memo } from 'react';
import { Handle, useStore, Position, useReactFlow, Edge, Node } from 'reactflow';

const dimensionAttrs: string[] = ['width', 'height'];

interface Props {
  id: string;
}

interface Dimensions {
  width: number;
  height: number;
}

const DimensionComponent = memo(({ id }: Props) => {
  const { setNodes } = useReactFlow();

  const dimensions = useStore((s) => {
    const node = s.nodeInternals.get('2-3') as Node | undefined;
    if (
      !node ||
      !node.width ||
      !node.height ||
      !s.edges.some((edge: Edge) => edge.target === id)
    ) {
      return null;
    }
    return {
      width: node.width,
      height: node.height,
    };
  });

  const updateDimension = (attr: keyof Dimensions) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === '2-3') {
          return {
            ...n,
            style: {
              ...n.style,
              [attr]: parseInt(event.target.value),
            },
          };
        }
        return n;
      }),
    );
  };

  return (
    <>
      <div className="wrapper gradient">
        <div className="inner">
          {dimensionAttrs.map((attr) => (
            <React.Fragment key={attr}>
              <label>node {attr}</label>
              <Input
                type="number"
                value={dimensions ? parseInt(dimensions[attr as keyof Dimensions].toString()) : 0}
                onChange={updateDimension(attr as keyof Dimensions)}
                className="nodrag"
                disabled={!dimensions}
              />
            </React.Fragment>
          ))}
          {!dimensions && 'no node connected'}
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
    </>
  );
});

DimensionComponent.displayName = 'DimensionComponent';

export default DimensionComponent;