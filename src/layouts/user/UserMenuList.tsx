'use client';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import UserRoutes from './UserRoutes';
import MenuListHelper from '../../base/MenuListHelper';

export default function UserMenuList({ isDesktop }: { isDesktop: boolean }) {
  return UserRoutes.map((item, index) => (
    <TooltipProvider key={index + item.path + item.name}>
      <MenuListHelper routes={item} isDesktop={isDesktop} />
    </TooltipProvider>
  ));
}