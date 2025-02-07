import { useEffect, useState } from 'react';
import HorizontalPost from '../Post/Horizontal';
import SeemoreButton from '../SeemoreButton';
import { IPage } from '~/interfaces/page.interface';
import VerticalPost from '../Post/Vertical';
import LoadingOverlay from '../LoadingOverlay';

export default function PostList({
  posts,
  postsGetter,
  emphasized = false,
}: {
  posts: Array<IPage>;
  postsGetter: (page: number) => Promise<Array<IPage>> | Array<IPage>;
  emphasized?: boolean;
}) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadedPosts, setLoadedPosts] = useState<Array<any>>(posts);

  const loadPosts = async () => {
    setLoading(true);
    const posts = await postsGetter(page + 1);
    setPage(page + 1);
    if (!posts.length) {
      setHasMore(false);
      setLoading(false);
      return;
    }
    setLoadedPosts([...loadedPosts, ...posts]);
    setLoading(false);
  };

  const articleProps = {
    ratio: '4/6',
    detailed: true,
    important: true,
    showCategory: true,
    className: 'flex flex-col text-xl',
  };

  useEffect(() => {
    setLoadedPosts(posts);
    setPage(1);
    setHasMore(true);
  }, [posts]);

  if (!loadedPosts.length) {
    return <div>No posts</div>;
  }

  return (
    <section>
      <ul id='article-list' className='grid gap-y-6 md:gap-y-4'>
        {emphasized && (
          <li>
            <VerticalPost
              page={loadedPosts[0]}
              detailed
              important
              className='mb-4'
            />
          </li>
        )}

        {(emphasized ? loadedPosts.slice(1) : loadedPosts).map(
          (a: any, i: number) => (
            <li key={i}>
              <HorizontalPost page={a} {...articleProps} />
            </li>
          )
        )}
      </ul>

      {loading && <LoadingOverlay />}

      {hasMore && <SeemoreButton className='mt-6' loadData={loadPosts} />}
    </section>
  );
}
