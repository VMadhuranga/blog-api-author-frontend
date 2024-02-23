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
import authorLoginAction from "./actions/author-login-action.js";
import postsLoader from "./loaders/posts-loader.js";
import "./index.css";
import createPostAction from "./actions/create-post-action.js";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
