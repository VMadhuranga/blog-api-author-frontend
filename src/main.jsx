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
import "./index.css";

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
          const errors = await authorLoginAction(formDataObj);

          if (errors) {
            return errors;
          }

          return redirect("/author/posts");
        },
      },
      {
        path: "posts",
        element: <Posts />,
        loader: postsLoader,
        children: [
          {
            index: true,
            element: <ContentGenerator />,
            action: async ({ request }) => {
              const formData = await request.formData();
              const formDataObj = Object.fromEntries(formData);

              const errors = await createPostAction(formDataObj);

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
          return postLoader(params);
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();
          const formDataObj = Object.fromEntries(formData);

          const error = await editPostAction(params, formDataObj);

          if (error) {
            return error;
          }

          return redirect(`/author/posts/${params.post_id}`);
        },
        children: [
          {
            index: true,
            element: <Comments />,
            loader: ({ params }) => {
              return commentsLoader(params);
            },
            action: async ({ params, request }) => {
              const formData = await request.formData();
              const formDataObj = Object.fromEntries(formData);

              const errors = await createCommentAction(params, formDataObj);
              if (errors) {
                return errors;
              }

              return redirect(`/author/posts/${params.post_id}`);
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
