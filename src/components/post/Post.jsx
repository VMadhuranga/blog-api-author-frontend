import { useState } from "react";
import { Form, Link, Outlet, useLoaderData } from "react-router-dom";
import ContentGenerator from "../content-generator/ContentGenerator";

export default function Post() {
  const [isEditPost, setIsEditPost] = useState(false);
  const post = useLoaderData();

  function handleEditPost() {
    setIsEditPost(!isEditPost);
  }

  return (
    <>
      <section>
        {isEditPost ? (
          <ContentGenerator method={"put"} fieldsData={post} />
        ) : (
          <>
            <h2>{post.title}</h2>
            <p>{new Date(post.createdDate).toLocaleDateString()}</p>
            <p>{post.isPublished ? "Published" : "Unpublished"}</p>
            <article>{post.content}</article>
            <p>
              See more <Link to={"/author/posts"}>posts</Link>
            </p>
          </>
        )}
        <div>
          <button onClick={handleEditPost} type="button">
            {isEditPost ? "Cancel" : "Edit post"}
          </button>
        </div>
        <Form method="delete">
          <button type="submit">Delete post</button>
        </Form>
      </section>
      <Outlet />
    </>
  );
}
