import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Comments from '../icons/Comments';
import AnimatedHeart from '../icons/AnimatedHeart';
import Share from '../icons/Share';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import Image from 'next/image';
import AxolotImage from '@/assets/picture/axolotl_loading.gif';

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
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-secondary/30 p-4 rounded-md">
          <p>Card Content</p>
          <Image alt="pictrue-contents" src={AxolotImage} />
        </div>
      </CardContent>
      <CardFooter>
        <Collapsible className="w-full space-y-3">
          <div className="w-full flex gap-x-2 justify-between">
            <AnimatedHeart />
            <div className="space-x-2">
              <CollapsibleTrigger className="w-fit">
                <Comments />
              </CollapsibleTrigger>
              <Share />
            </div>
          </div>
          <CollapsibleContent className="collapsible-content transition-all duration-1000 ease-in-out overflow-hidden">
            <div className="bg-secondary p-4 rounded-md transform origin-top transition-transform">
              Yes. Free to use for personal and commercial projects. No attribution required.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardFooter>
    </Card>
  );
}

export default PostItem;
