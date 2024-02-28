import axios from "axios";

export default async function createCommentAction(baseUrl, params, formData) {
  try {
    await axios.post(
      `${baseUrl}/author/posts/${params.post_id}/comments`,
      formData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
  } catch (error) {
    return error.response.data;
  }
}
