'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';

type Props = {
  routes: TypeRoutes;
  isDesktop: boolean;
};

export type TypeRoutes = {
  key: string;
  path: string;
  name: string;
  icon: unknown;
};

export default function MenuListHelper({ routes, isDesktop }: Props) {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const exPath = pathname.split('/');
      const subPath = `/${exPath[1] ?? ''}/${exPath[2] ?? ''}`;
      setIsActive(pathname === routes.path || subPath === routes.path);
    }
  }, [pathname, routes.path]);

  return (
    <Fragment>
      {isDesktop ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={routes.path}
              className={
                (isActive
                  ? 'text-primary-foreground bg-primary text-lg font-semibold md:text-base'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground hover:scale-25 ') +
                ' flex h-9 w-9 items-center justify-center rounded-lg transition-colors'
              }
            >
              {routes.icon as React.ReactNode}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-1">
            <p className="text-foreground bg-accent py-1 px-3 rounded-md">{routes.name}</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Link href={routes.path} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
          {routes.icon as React.ReactNode}
          {routes.name}
        </Link>
      )}
    </Fragment>
  );
}
