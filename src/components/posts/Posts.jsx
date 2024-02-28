import { useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import unescape from "../../utils/unescape";
import styles from "./Posts.module.css";
import buttonStyles from "../../assets/stylesheets/button.module.css";

export default function Posts() {
  const [isNewPost, setIsNewPost] = useState(false);
  const posts = useLoaderData();

  function handleCreateNewPost() {
    setIsNewPost(!isNewPost);
  }

  return (
    <section className={styles.postsComponent}>
      <h1>{isNewPost ? "New post" : "Posts"}</h1>
      {isNewPost ? (
        <Outlet />
      ) : (
        <article>
          {posts.length > 0 ? (
            <ul className={styles.postsList}>
              {posts.map((post) => (
                <li key={post._id}>
                  <Link to={`${post._id}`}>{unescape(post.title)}</Link>
                  <span>{new Date(post.createdDate).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noPostMsg}>There are no posts yet</p>
          )}
        </article>
      )}
      <div className={styles.buttonContainer}>
        <button
          onClick={handleCreateNewPost}
          type="button"
          className={buttonStyles.primary}
        >
          {isNewPost ? "Cancel" : "Create new post"}
        </button>
      </div>
    </section>
  );
}
