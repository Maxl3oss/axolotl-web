import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import Image from 'next/image';
import AxolotImage from '@/assets/picture/axolotl_loading.gif';
import ProfilePost from './ProfilePost';
import PostBar from './PostBar';

type IPostItem = {
  id: number;
  title: string;
  description: string;
};

type Props = {
  data: IPostItem;
};

function PostItem() {
  return (
    <Card className="border-0 border-b rounded-none bg-background">
      <div className="flex flex-col space-y-1.5 px-6 mt-3">
        <ProfilePost />
      </div>
      <CardContent className="-mt-4 space-y-1 ml-[2.3rem] pl-8 pb-2">
        <div id="header-post">
          <p>My First Post Axolotl!</p>
        </div>
        <div id="image-post" className="bg-secondary/30 p-4 rounded-md">
          <Image alt="pictrue-contents" src={AxolotImage} />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-3">
        <div className="w-full ml-[0.8rem] mt-2 pl-8">
          <PostBar />
        </div>
      </CardFooter>
    </Card>
  );
}

export default PostItem;
