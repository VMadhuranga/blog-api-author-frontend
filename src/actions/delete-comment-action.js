import axios from "axios";

export default async function deleteCommentAction(param, comment_id) {
  await axios.delete(
    `http://localhost:3000/author/posts/${param.post_id}/comments/${comment_id}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  );
}
