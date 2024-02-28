import axios from "axios";

export default async function postsLoader(baseUrl) {
  try {
    const response = await axios.get(`${baseUrl}/author/posts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.statusText);
  }
}
