'use client';

import { useState } from 'react';
import AnimatedHeart from '../icons/AnimatedHeart';
import Comments from '../icons/Comments';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { TriangleIcon } from 'lucide-react';

const PostBar = () => {
  const [isOpenComment, setIsOpenComment] = useState(false);

  return (
    <Collapsible className="w-full space-y-3" open={isOpenComment} onOpenChange={setIsOpenComment}>
      <div className="w-full flex gap-x-2">
        <AnimatedHeart />
        <CollapsibleTrigger className="w-fit h-fit rounded-md">
          <Comments isOpen={isOpenComment} />
        </CollapsibleTrigger>
        {/* <Share /> */}
      </div>
      <CollapsibleContent className="collapsible-content transition-all duration-1000 ease-in-out overflow-hidden">
        <div className="transform origin-top transition-transform">
          <div className="flex gap-3 items-start py-3 border-t">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* center */}
            <div className="flex flex-col gap-y-2">
              <p className="text-sm font-semibold">
                Narongrid Naorkham <span className="font-normal text-muted-foreground">1 ซม. ที่แล้ว</span>
              </p>
              <div className="relative flex w-full items-center gap-x-1 bg-secondary py-2 px-3 rounded-md">
                <p>test my first comments.</p>
                {/* Triang */}
                <TriangleIcon className="absolute -top-2 -left-2 -rotate-45 text-secondary fill-secondary" />
              </div>
              {/* bar */}
              <div className="w-full flex gap-x-2">
                <AnimatedHeart />
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-start py-3 border-t">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* center */}
            <div className="flex flex-col gap-y-2">
              <p className="text-sm font-semibold">
                Narongrid Naorkham <span className="font-normal text-muted-foreground">1 ซม. ที่แล้ว</span>
              </p>
              <div className="relative flex w-full items-center gap-x-1 bg-secondary py-2 px-3 rounded-md">
                <p>test my first comments.</p>
                {/* Triang */}
                <TriangleIcon className="absolute -top-2 -left-2 -rotate-45 text-secondary fill-secondary" />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PostBar;
