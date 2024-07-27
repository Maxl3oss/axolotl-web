import { Edit3Icon, HeartIcon, HomeIcon, SearchIcon, User2Icon } from 'lucide-react';

type Routes = {
  id: number;
  name: string;
  path: string;
  icon: React.ReactNode;
};

const routes: Routes[] = [
  { id: 1, name: 'home', path: '', icon: <HomeIcon strokeWidth={2.5} /> },
  { id: 2, name: 'search', path: 'search', icon: <SearchIcon strokeWidth={2.5} /> },
  { id: 2, name: 'add', path: 'add', icon: <Edit3Icon strokeWidth={2.5} /> },
  { id: 2, name: 'like', path: 'like', icon: <HeartIcon strokeWidth={2.5} /> },
  { id: 2, name: 'user', path: 'user', icon: <User2Icon strokeWidth={2.5} /> },
];

export default routes;
