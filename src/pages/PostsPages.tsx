import { usePostsQuery } from '../generated/graphql';

export function PostsPage() {
  const { loading, data } = usePostsQuery();

  if (loading) return <div>Loading posts...</div>;

  return (
    <div className="space-y-4">
      {data?.posts.map((post) => (
        <article className="p-4 bg-white border rounded-md" key={post.id}>
          <h2 className="font-bold">{post.title}</h2>
          <div className="text-xs text-right">
            Автор: <span className="font-bold">{post.author.name}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
