'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface EditorProps {
  content?: string;
  onChange?: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content = "", onChange }) => {
  const [code, setCode] = useState<string>(content);

  useEffect(() => {
    setCode(content);
  }, [content]);

  const handleEditorChange = (value?: string) => {
    if (value !== undefined) {
      setCode(value);
      onChange && onChange(value);
    }
  };

  return (
    <div className="flex w-full py-5 bg-[#1e1e1e] h-[60vh] rounded-md">
      <MonacoEditor
        key={"monaco-editor"}
        height="100%"
        language="text"
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
      />
    </div>
  );
};

export default Editor;
