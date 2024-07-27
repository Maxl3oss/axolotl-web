import SocialMediaLayout from '@/layouts/social/SocialMediaLayout';
import PostItem from './PostItem';

function MainFeeds() {
  return (
    <SocialMediaLayout>
      <section id="feeds" className="grid place-content-center">
        <div className="w-full md:max-w-xl md:min-w-[600px] text-red-500 space-y-3">
          {Array.from({ length: 10 }).map((_, idx) => (
            <PostItem key={idx + '-post'} />
          ))}
        </div>
      </section>
    </SocialMediaLayout>
  );
}

export default MainFeeds;
