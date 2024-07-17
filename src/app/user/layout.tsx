import UserLayout from '@/layouts/UserLayout';

export default function UserRootLayout({ children }: { children: React.ReactNode }) {
  return <UserLayout>{children}</UserLayout>;
}
