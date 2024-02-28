import { Form, useActionData, useLoaderData } from "react-router-dom";
import unescape from "../../utils/unescape";
import styles from "./Comments.module.css";
import buttonStyles from "../../assets/stylesheets/button.module.css";

export default function Comments() {
  const comments = useLoaderData();
  const errors = useActionData();

  return (
    <section className={styles.commentSection}>
      <h3>Comments</h3>
      <Form method="post" className={styles.createCommentForm}>
        <div>
          <label htmlFor="user_name">Name :</label>
          <input type="text" name="user_name" id="user_name" required />
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
      </Form>
      <article>
        {comments.length > 0 ? (
          <ul className={styles.commentList}>
            {comments.map((comment) => {
              return (
                <li key={comment._id}>
                  <p>{unescape(comment.commentedUser)} :</p>
                  <p>{unescape(comment.text)}</p>
                  <Form method="delete">
                    <input
                      type="hidden"
                      name="comment_id"
                      value={comment._id}
                    />
                    <button type="submit" className={buttonStyles.primary}>
                      Delete comment
                    </button>
                  </Form>
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
