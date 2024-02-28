import axios from "axios";

export default async function createPostAction(baseUrl, formData) {
  try {
    await axios.post(`${baseUrl}/author/posts`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  } catch (error) {
    return error.response.data;
  }
}
