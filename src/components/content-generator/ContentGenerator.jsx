import { useState } from "react";
import PropTypes from "prop-types";
import { Form, useActionData } from "react-router-dom";
import styles from "./ContentGenerator.module.css";
import buttonStyles from "../../assets/stylesheets/button.module.css";

export default function ContentGenerator({ method = "post", fieldsData }) {
  const [formFieldsData, setFormFieldsData] = useState(
    fieldsData || {
      title: "",
      content: "",
      isPublished: false,
    },
  );
  const errors = useActionData();

  function handleTitleChange(e) {
    setFormFieldsData({ ...formFieldsData, title: e.target.value });
  }

  function handleContentChange(e) {
    setFormFieldsData({ ...formFieldsData, content: e.target.value });
  }

  function handlePublishChange(e) {
    setFormFieldsData({
      ...formFieldsData,
      isPublished: e.target.value === "yes",
    });
  }

  return (
    <Form method={method} className={styles.contentGenerator}>
      <div>
        <label htmlFor="title">Title :</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formFieldsData.title}
          onChange={handleTitleChange}
          required
        />
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
          value={formFieldsData.content}
          onChange={handleContentChange}
          required
        ></textarea>
        {errors &&
          errors.data
            .filter((error) => error.path === "content")
            .map((error, index) => <span key={index}>{error.msg}</span>)}
      </div>
      <div>
        <p>
          Publish :{" "}
          <label htmlFor="yes">
            Yes{" "}
            <input
              type="radio"
              name="publish"
              id="yes"
              value="yes"
              checked={formFieldsData.isPublished}
              onChange={handlePublishChange}
              required
            />{" "}
          </label>
          <label htmlFor="no">
            No{" "}
            <input
              type="radio"
              name="publish"
              id="no"
              value="no"
              checked={!formFieldsData.isPublished}
              onChange={handlePublishChange}
              required
            />
          </label>
        </p>
      </div>
      <div>
        <button type="submit" className={buttonStyles.primary}>
          Submit
        </button>
      </div>
    </Form>
  );
}

ContentGenerator.propTypes = {
  method: PropTypes.string,
  fieldsData: PropTypes.object,
};
