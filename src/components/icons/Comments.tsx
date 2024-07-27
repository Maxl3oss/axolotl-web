'use client';

import { MessageCircleIcon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  isOpen?: boolean;
};

const Comments: React.FC<Props> = ({ isOpen }) => {
  return (
    <div className={`${isOpen ? 'icon-active text-blue-500' : 'text-muted-foreground'} icon-container`}>
      <div className="cursor-pointer">
        <MessageCircleIcon className={isOpen ? 'fill-blue-500' : ''} size={18} strokeWidth={2} />
      </div>
      <p>32</p>
    </div>
  );
};

export default Comments;
