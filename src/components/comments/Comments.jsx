import { useState } from "react";
import { useActionData, useFetcher, useLoaderData } from "react-router-dom";
import unescape from "../../utils/unescape";
import styles from "./Comments.module.css";
import buttonStyles from "../../assets/stylesheets/button.module.css";

export default function Comments() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const comments = useLoaderData();
  const errors = useActionData();
  const fetcher = useFetcher();

  function handleFormSubmit() {
    setName("");
    setComment("");
  }

  return (
    <section className={styles.commentSection}>
      <h3>Comments</h3>
      <fetcher.Form
        method="post"
        className={styles.createCommentForm}
        onSubmit={handleFormSubmit}
      >
        <div>
          <label htmlFor="user_name">Name :</label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors &&
            errors.data
              .filter((error) => error.path === "user_name")
              .map((error, index) => <span key={index}>{error.msg}</span>)}
        </div>
        <div>
          <label htmlFor="comment">Comment :</label>
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="10"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
          {errors &&
            errors.data
              .filter((error) => error.path === "comment")
              .map((error, index) => <span key={index}>{error.msg}</span>)}
        </div>
        <div>
          <button type="submit" className={buttonStyles.primary}>
            Submit
          </button>
        </div>
      </fetcher.Form>
      <article>
        {comments.length > 0 ? (
          <ul className={styles.commentList}>
            {comments.map((comment) => {
              return (
                <li key={comment._id}>
                  <p>{unescape(comment.commentedUser)} :</p>
                  <p>{unescape(comment.text)}</p>
                  <fetcher.Form method="delete">
                    <input
                      type="hidden"
                      name="comment_id"
                      value={comment._id}
                    />
                    <button type="submit" className={buttonStyles.primary}>
                      Delete comment
                    </button>
                  </fetcher.Form>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={styles.noCommentsMsg}>There are no comments yet</p>
        )}
      </article>
    </section>
  );
}
