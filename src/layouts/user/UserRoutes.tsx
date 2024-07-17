import { TypeRoutes } from '@/components/base/MenuListHelper';
import { BookHeart, LayoutDashboardIcon, NotebookIcon } from 'lucide-react';

const UserRoutes: TypeRoutes[] = [
  {
    key: 'flow',
    path: '/user/flow',
    name: 'กระดาน',
    icon: <BookHeart className="icon-sm" />,
  },
  {
    key: 'note',
    path: '/user/note',
    name: 'note',
    icon: <NotebookIcon className="icon-sm" />,
  },
  {
    key: 'dashboard',
    path: '/user/dashboard',
    name: 'dashboard',
    icon: <LayoutDashboardIcon className="icon-sm" />,
  },
];

export default UserRoutes;
