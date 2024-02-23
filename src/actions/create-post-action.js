import axios from "axios";

export default async function createPostAction(formData) {
  try {
    await axios.post("http://localhost:3000/author/posts", formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  } catch (error) {
    return error.response.data;
  }
}
