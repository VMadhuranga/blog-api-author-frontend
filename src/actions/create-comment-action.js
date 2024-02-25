import axios from "axios";

export default async function createCommentAction(params, formData) {
  try {
    await axios.post(
      `http://localhost:3000/author/posts/${params.post_id}/comments`,
      formData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
  } catch (error) {
    return error.response.data;
  }
}
