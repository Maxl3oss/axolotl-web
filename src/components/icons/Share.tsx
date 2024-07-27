'use client';

import { Share2Icon } from 'lucide-react';

const Share: React.FC = () => {
  return (
    <button type="button" className={`icon-container text-muted-foreground`}>
      <div className="cursor-pointer" onClick={() => {}}>
        <Share2Icon size={18} strokeWidth={2} />
      </div>
      <p>32</p>
    </button>
  );
};

export default Share;
