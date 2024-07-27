import SocialMediaLayout from '@/layouts/social/SocialMediaLayout';

type Props = {
  params: { slug: string };
};

const Page: React.FC<Props> = ({ params }) => {
  return <SocialMediaLayout ortherMenu>{params.slug.toString()}</SocialMediaLayout>;
};

export default Page;
