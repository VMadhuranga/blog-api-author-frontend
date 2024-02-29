import { Link, useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  const errMsg = error.statusText || error.message;

  return (
    <div id="error-page" className={styles.errorPage}>
      <h2>Oops!</h2>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errMsg}</i>
      </p>
      <p>
        Go back to{" "}
        <Link to={errMsg === "Not Found" ? "/author/posts" : "/author"}>
          {errMsg === "Not Found" ? "Posts" : "Login"}
        </Link>
      </p>
    </div>
  );
}
