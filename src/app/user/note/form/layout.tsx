import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Axolotl - Form Note',
  description: 'Axolotl Form note page',
};

export default function UserRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
