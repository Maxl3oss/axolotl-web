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
    <div className="icon-container cursor-pointer" onClick={handleClick}>
      <div className={`heart-icon ${isAnimating ? 'animate' : ''}`}>
        <Heart
          size={18}
          color={isAnimating || isChecked ? '#ff4d4d' : 'white'}
          fill={isAnimating || isChecked ? '#ff4d4d' : 'none'}
          strokeWidth={2}
        />
      </div>
      <p className="text-muted-foreground">32</p>
    </div>
  );
};

export default AnimatedHeart;
