'use client';

import authStore from '@/store/authStore';
import Image, { StaticImageData } from 'next/image';
import NoProfile from '@/assets/picture/axolotl_profile.png';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Props = {
  width?: number;
  height?: number;
};

export default function ProfileUser({ width = 36, height = 36 }: Props) {
  const { getUserSession } = authStore();
  const [profile, setProfile] = useState<string | StaticImageData | undefined>(NoProfile);

  useEffect(() => {
    try {
      const data = getUserSession();
      if (data?.picture) {
        setProfile(data.picture);
      } else {
        setProfile(NoProfile);
      }
    } catch (error) {
      console.error('Error fetching user session:', error);
      setProfile(NoProfile);
    }
  }, []);

  const handleError = () => {
    setProfile(NoProfile);
  };

  return (
    <Image
      src={profile ?? NoProfile}
      width={width}
      height={height}
      alt="Avatar"
      className="outline-none overflow-hidden rounded-full"
      onError={handleError}
    />
  );
}

export function UserDropDown() {
  const { getUserSession, logout } = authStore();
  const userInfo = getUserSession();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
          <ProfileUser />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{userInfo?.email ?? ""}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
