import axios from "axios";

export default async function deletePostAction(param) {
  await axios.delete(`http://localhost:3000/posts/${param.post_id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}
