import { Form, useActionData } from "react-router-dom";

export default function AuthorLogin() {
  const errors = useActionData();

  return (
    <section>
      <h2>Login author</h2>
      <Form method="post">
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
          <input type="text" name="password" id="password" required />
          {errors &&
            errors.data
              .filter((error) => error.path === "password")
              .map((error, index) => <span key={index}>{error.msg}</span>)}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </section>
  );
}
