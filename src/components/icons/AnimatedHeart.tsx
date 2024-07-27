'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const AnimatedHeart: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsChecked((prev) => !prev);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <button
      type="button"
      className={`icon-container cursor-pointer text-sm ${isChecked ? 'text-red-500 icon-active' : 'text-muted-foreground'}`}
      onClick={handleClick}
    >
      <div className={`heart-icon ${isAnimating ? 'animate' : ''}`}>
        <Heart size={18} className={isChecked ? 'fill-red-500' : ''} strokeWidth={2} />
      </div>
      <p>32</p>
    </button>
  );
};

export default AnimatedHeart;
