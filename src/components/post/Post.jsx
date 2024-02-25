import { Link, Outlet, useLoaderData } from "react-router-dom";

export default function Post() {
  const post = useLoaderData();

  return (
    <>
      <section>
        <h2>{post.title}</h2>
        <p>{new Date(post.createdDate).toLocaleDateString()}</p>
        <p>{post.isPublished ? "Published" : "Unpublished"}</p>
        <article>{post.content}</article>
        <p>
          See more <Link to={"/author/posts"}>posts</Link>
        </p>
      </section>
      <Outlet />
    </>
  );
}
