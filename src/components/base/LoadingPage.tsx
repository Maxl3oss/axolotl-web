import Image from 'next/image';
import NoneLayout from '@/layouts/NoneLayout';
import AxolotlImg from '@/assets/picture/axolotl_loading.gif';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Axolotl - Loading',
  description: 'Axolotl login page',
};

function LoadingPage() {
  return (
    <NoneLayout>
      <div className="flex justify-center items-center h-[20vh]">
        <Image
          alt="Axolotl login"
          src={AxolotlImg}
          className="h-auto w-auto max-h-full max-w-full"
          priority
          unoptimized
        />
      </div>
    </NoneLayout>
  );
}

export default LoadingPage;
