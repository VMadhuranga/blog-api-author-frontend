import { Form, useActionData } from "react-router-dom";
import styles from "./AuthorLogin.module.css";
import buttonStyles from "../../assets/stylesheets/button.module.css";

export default function AuthorLogin() {
  const errors = useActionData();

  return (
    <section>
      <h2>Login author</h2>
      <Form method="post" className={styles.authorLoginForm}>
        <div>
          <label htmlFor="user_name">User name: </label>
          <input type="text" name="user_name" id="user_name" required />
          {errors &&
            errors.data
              .filter((error) => error.path === "user_name")
              .map((error, index) => <span key={index}>{error.msg}</span>)}
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" required />
          {errors &&
            errors.data
              .filter((error) => error.path === "password")
              .map((error, index) => <span key={index}>{error.msg}</span>)}
        </div>
        <div>
          <button type="submit" className={buttonStyles.primary}>
            Submit
          </button>
        </div>
      </Form>
    </section>
  );
}
