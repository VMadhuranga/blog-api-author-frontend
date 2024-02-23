import axios from "axios";

export default async function postsLoader() {
  try {
    const response = await axios.get("http://localhost:3000/author/posts", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.statusText);
  }
}
