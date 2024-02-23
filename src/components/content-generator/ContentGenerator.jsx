import { Form, useActionData } from "react-router-dom";

export default function ContentGenerator() {
  const errors = useActionData();

  return (
    <Form method="post">
      <div>
        <label htmlFor="title">Title :</label>
        <input type="text" name="title" id="title" required />
        {errors &&
          errors.data
            .filter((error) => error.path === "title")
            .map((error, index) => <span key={index}>{error.msg}</span>)}
      </div>
      <div>
        <label htmlFor="content">Content :</label>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          required
        ></textarea>
        {errors &&
          errors.data
            .filter((error) => error.path === "content")
            .map((error, index) => <span key={index}>{error.msg}</span>)}
      </div>
      <div>
        <p>Publish :</p>
        <label htmlFor="yes">
          Yes{" "}
          <input type="radio" name="publish" id="yes" value="yes" required />
        </label>
        <label htmlFor="no">
          No <input type="radio" name="publish" id="no" value="no" required />
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
}
