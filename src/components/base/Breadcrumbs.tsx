'use client';

import React, { Fragment, useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

function Breadcrumbs() {
  const pathname = usePathname();
  const [paths, setPaths] = useState<string[]>([]);
  const [splitPath, setSplitPath] = useState<string[]>([]);

  const makeSegments = (pathSegments: string[]) => {
    let arr = [];
    for (let i = 1; i <= pathSegments.length; i++) {
      let path = '';
      for (let j = 0; j < i; j++) {
        path += '/' + pathSegments[j];
      }
      arr.push(path);
    }
    setPaths(arr);
    return arr;
  };

  useEffect(() => {
    if (pathname.length > 0) {
      const splitPath = pathname.split('/').splice(1);
      setSplitPath(splitPath);
      makeSegments(splitPath);
    }
  }, [pathname]);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {splitPath.map((item, index) => (
          <Fragment key={`key-bc-${item}-${index}`}>
            {index === 0 ? null : index + 1 !== splitPath.length ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={paths[index] ?? ''}>{item}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbItem>
                <Badge variant="secondary">
                  <BreadcrumbPage>{item}</BreadcrumbPage>
                </Badge>
              </BreadcrumbItem>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
