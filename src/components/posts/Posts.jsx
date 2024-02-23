import { Link, useLoaderData } from "react-router-dom";

export default function Posts() {
  const posts = useLoaderData();

  return (
    <section>
      <h1>Posts</h1>
      <article>
        {posts.length ? (
          <ul>
            {posts.map((post) => (
              <li key={post._id}>
                <Link to={`${post._id}`}>
                  {post.title}
                  <span>{new Date(post.createdDate).toLocaleDateString()}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>There are no posts yet</p>
        )}
      </article>
    </section>
  );
}
