import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return <ReactMarkdown rehypePlugins={[rehypeRaw]} className='break-all break-words'>{content}</ReactMarkdown>;
};

export default MarkdownRenderer;