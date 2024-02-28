import axios from "axios";

export default async function deleteCommentAction(baseUrl, param, comment_id) {
  await axios.delete(
    `${baseUrl}/author/posts/${param.post_id}/comments/${comment_id}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  );
}
