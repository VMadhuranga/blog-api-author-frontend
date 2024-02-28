import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./components/error-page/ErrorPage.jsx";
import AuthorLogin from "./components/author-login/AuthorLogin.jsx";
import Posts from "./components/posts/Posts.jsx";
import ContentGenerator from "./components/content-generator/ContentGenerator.jsx";
import Post from "./components/post/Post.jsx";
import Comments from "./components/comments/Comments.jsx";
import authorLoginAction from "./actions/author-login-action.js";
import postsLoader from "./loaders/posts-loader.js";
import createPostAction from "./actions/create-post-action.js";
import postLoader from "./loaders/post-loader.js";
import commentsLoader from "./loaders/comments-loader.js";
import createCommentAction from "./actions/create-comment-action.js";
import editPostAction from "./actions/edit-post-action.js";
import deletePostAction from "./actions/delete-posts-action.js";
import deleteCommentAction from "./actions/delete-comment-action.js";
import "./index.css";

const baseUrl = "https://blog-api-backend.adaptable.app";
const router = createBrowserRouter([
  {
    path: "/author",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AuthorLogin />,
        action: async ({ request }) => {
          const formData = await request.formData();
          const formDataObj = Object.fromEntries(formData);
          const errors = await authorLoginAction(baseUrl, formDataObj);

          if (errors) {
            return errors;
          }

          return redirect("/author/posts");
        },
      },
      {
        path: "posts",
        element: <Posts />,
        loader: () => postsLoader(baseUrl),
        children: [
          {
            index: true,
            element: <ContentGenerator />,
            action: async ({ request }) => {
              const formData = await request.formData();
              const formDataObj = Object.fromEntries(formData);

              const errors = await createPostAction(baseUrl, formDataObj);

              if (errors) {
                return errors;
              }

              return redirect("/author/posts");
            },
          },
        ],
      },
      {
        path: "posts/:post_id",
        element: <Post />,
        loader: ({ params }) => {
          return postLoader(baseUrl, params);
        },
        action: async ({ request, params }) => {
          if (request.method === "PUT") {
            const formData = await request.formData();
            const formDataObj = Object.fromEntries(formData);

            const error = await editPostAction(baseUrl, params, formDataObj);

            if (error) {
              return error;
            }

            return redirect(`/author/posts/${params.post_id}`);
          }

          if (request.method === "DELETE") {
            await deletePostAction(baseUrl, params);
            return redirect("/author/posts");
          }
        },
        children: [
          {
            index: true,
            element: <Comments />,
            loader: ({ params }) => {
              return commentsLoader(baseUrl, params);
            },
            action: async ({ params, request }) => {
              if (request.method === "POST") {
                const formData = await request.formData();
                const formDataObj = Object.fromEntries(formData);

                const errors = await createCommentAction(
                  baseUrl,
                  params,
                  formDataObj,
                );

                if (errors) {
                  return errors;
                }

                return null;
              }

              if (request.method === "DELETE") {
                const commentId = (await request.formData()).get("comment_id");
                await deleteCommentAction(baseUrl, params, commentId);

                return null;
              }
            },
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
