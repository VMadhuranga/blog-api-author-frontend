import { useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";

export default function Posts() {
  const [isNewPost, setIsNewPost] = useState(false);
  const posts = useLoaderData();

  function handleCreateNewPost() {
    setIsNewPost(!isNewPost);
  }

  return (
    <section>
      <h1>{isNewPost ? "New post" : "Posts"}</h1>
      {isNewPost ? (
        <Outlet />
      ) : (
        <article>
          {posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li key={post._id}>
                  <Link to={`${post._id}`}>
                    {post.title}
                    <span>
                      {new Date(post.createdDate).toLocaleDateString()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>There are no posts yet</p>
          )}
        </article>
      )}
      <div>
        <button onClick={handleCreateNewPost} type="button">
          {isNewPost ? "Cancel" : "Create new post"}
        </button>
      </div>
    </section>
  );
}
