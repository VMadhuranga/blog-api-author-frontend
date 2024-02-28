import { useState } from "react";
import { Form, Link, Outlet, useLoaderData } from "react-router-dom";
import Markdown from "react-markdown";
import unescape from "../../utils/unescape";
import ContentGenerator from "../content-generator/ContentGenerator";
import styles from "./Post.module.css";
import buttonStyles from "../../assets/stylesheets/button.module.css";

export default function Post() {
  const [isEditPost, setIsEditPost] = useState(false);
  const post = useLoaderData();
  post.content = unescape(post.content);
  post.title = unescape(post.title);

  function handleEditPost() {
    setIsEditPost(!isEditPost);
  }

  return (
    <>
      <section className={styles.postComponent}>
        {isEditPost ? (
          <ContentGenerator method={"put"} fieldsData={post} />
        ) : (
          <>
            <h2>{post.title}</h2>
            <p className={styles.createdDate}>
              {new Date(post.createdDate).toLocaleDateString()}
            </p>
            <p>{post.isPublished ? "Published" : "Unpublished"}</p>
            <article>
              <Markdown skipHtml className={styles.postContent}>
                {post.content}
              </Markdown>
            </article>
            <p>
              See more <Link to={"/author/posts"}>posts</Link>
            </p>
          </>
        )}
        <div>
          <button
            onClick={handleEditPost}
            type="button"
            className={buttonStyles.primary}
          >
            {isEditPost ? "Cancel" : "Edit post"}
          </button>
        </div>
        <Form method="delete">
          <button type="submit" className={buttonStyles.primary}>
            Delete post
          </button>
        </Form>
      </section>
      <Outlet />
    </>
  );
}
