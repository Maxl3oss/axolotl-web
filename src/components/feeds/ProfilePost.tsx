import { EarthIcon, MoreHorizontalIcon } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';

const ProfilePost = () => {
  return (
    <div className="flex gap-3 items-center">
      <Avatar className="w-8 h-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {/* center */}
      <div className="grow grid grid-rows-2 text-sm">
        <div className="font-semibold">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link href={'/@narongrid'} className="hover:underline">
                Narongrid Naorkham
              </Link>
            </HoverCardTrigger>
            <HoverCardContent>The React Framework – created and maintained by @vercel.</HoverCardContent>
          </HoverCard>
          <span className="ml-2 font-normal text-muted-foreground">1 ซม. ที่แล้ว</span>
        </div>
      </div>
      {/* more */}
      <div className="hover:bg-secondary p-1 rounded-full">
        <MoreHorizontalIcon height={18} className="cursor-pointer text-muted-foreground" />
      </div>
    </div>
  );
};

export default ProfilePost;
