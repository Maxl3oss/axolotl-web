'use client';

import { CSSProperties, memo } from 'react';

type Props = {
  data: {
    level: string;
    label: string;
    arrowStyle?: CSSProperties | undefined;
  }
}

function AnnotationNode({ data }: Props) {
  return (
    <>
      <div style={{ padding: 10, display: 'flex' }}>
        <div style={{ marginRight: 4 }}>{data.level}.</div>
        <div>{data.label}</div>
      </div>
      {data.arrowStyle && (
        <div className="arrow" style={data.arrowStyle}>
          ⤹
        </div>
      )}
    </>
  );
}

export default memo(AnnotationNode);
