import { useState } from "react";
import { Form, Link, Outlet, useLoaderData } from "react-router-dom";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import PropTypes from "prop-types";
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
              {new Date(post.createdDate).toDateString()}
            </p>
            <p>{post.isPublished ? "Published" : "Unpublished"}</p>
            <article>
              <Markdown
                skipHtml
                className={styles.postContent}
                components={{
                  code(props) {
                    const { children, className } = props;
                    const match = /language-(\w+)/.exec(className || "");

                    return match ? (
                      <SyntaxHighlighter
                        PreTag="div"
                        language={className?.split("-")[1]}
                        style={oneDark}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        style={{
                          fontSize: "0.9rem",
                          backgroundColor: "rgb(40, 44, 52)",
                          padding: "6px",
                          borderRadius: "5px",
                        }}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
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
        {!isEditPost && (
          <Form method="delete">
            <button type="submit" className={buttonStyles.primary}>
              Delete post
            </button>
          </Form>
        )}
      </section>
      <Outlet />
    </>
  );
}

Post.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
};
