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
import authorLoginAction from "./actions/author-login-action.js";
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
          const error = await authorLoginAction(formDataObj);

          if (error) {
            return error;
          }

          return redirect("/author/posts");
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
