'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowLeftIcon, Edit3, HeartIcon, Home, HomeIcon, SearchIcon, User2 } from 'lucide-react';
import './socaial.css';
import routes from './routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import authStore from '@/store/authStore';
import { UserDropDown } from '../user/ProfileUser';
import { Fragment } from 'react';
import Image from 'next/image';
import Logo from '@/assets/picture/axolotl_logo.webp';

interface Props {
  children: React.ReactNode;
  ortherMenu?: boolean;
}

const SocialMediaLayout: React.FC<Props> = ({ children, ortherMenu }) => {
  const pathname = usePathname();
  const { getIsLoggedInSession } = authStore();
  const isLogged = getIsLoggedInSession();

  return (
    <Fragment>
      <nav className="nav-contrainer">
        <div className="container-nav-sub">
          <Image alt="logo" src={Logo} className="h-12 w-12 rounded-full" />
        </div>

        <div className={`container-nav-center`}>
          {ortherMenu && (
            <div className="flex items-center justify-center w-1/6">
              <Link
                href={'/'}
                key={'menu-btn-orthwe'}
                type="button"
                className="min-w-fit p-5 rounded-full hover:bg-secondary text-white"
              >
                <ArrowLeftIcon />
              </Link>
            </div>
          )}
          <div className="nav-main-btn">
            {routes.map((item, idx) => (
              <Link
                href={'/' + item.path}
                key={'menu-btn-' + idx}
                type="button"
                className={`btn-menu-nav ${pathname === '/' + item.path?.split('/')[0] ? 'is-active' : ''}`}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="container-nav-sub justify-end">
          {isLogged ? (
            <UserDropDown />
          ) : (
            <Link href={'/auth/login'}>
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </nav>
      <main>{children}</main>
      {/* menu mobile */}
      <menu className="menu-moblile">
        {routes.map((item, idx) => (
          <Link
            href={'/' + item.path}
            key={'menu-btn-' + idx}
            type="button"
            className={`btn-menu-nav ${pathname === '/' + item.path?.split('/')[0] ? 'is-active' : ''}`}
          >
            {item.icon}
          </Link>
        ))}
      </menu>
    </Fragment>
  );
};

export default SocialMediaLayout;
