'use client';

import { Share2Icon } from 'lucide-react';

const Share: React.FC = () => {
  return (
    <div className="icon-container">
      <div className="cursor-pointer" onClick={() => {}}>
        <Share2Icon size={18} strokeWidth={2} />
      </div>
      <p className="text-muted-foreground">32</p>
    </div>
  );
};

export default Share;
