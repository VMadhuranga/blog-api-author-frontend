import axios from "axios";

export default async function deletePostAction(baseUrl, param) {
  await axios.delete(`${baseUrl}/posts/${param.post_id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}
