'use client';

import { MessageCircleIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { useState } from 'react';

const Comments: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${isOpen ? 'icon-active' : ''} icon-container`} onClick={() => setIsOpen((prev) => !prev)}>
      <div className="cursor-pointer">
        <MessageCircleIcon color={isOpen ? '#4299e1' : undefined} size={18} strokeWidth={2} />
      </div>
      <p className="text-muted-foreground">32</p>
    </div>
  );
};

export default Comments;
