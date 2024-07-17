import PostItem from './PostItem';

function MainFeeds() {
  return (
    <main className="container">
      <header className=""></header>
      <section id="feeds" className="flex justify-center">
        <div className="w-full md:max-w-xl md:min-w-[600px] text-red-500 space-y-3">
          {Array.from({ length: 10 }).map((_, idx) => (
            <PostItem key={idx + '-post'} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default MainFeeds;
