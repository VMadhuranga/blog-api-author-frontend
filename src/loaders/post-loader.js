import axios from "axios";

export default async function postLoader(params) {
  try {
    const response = await axios.get(
      `http://localhost:3000/author/posts/${params.post_id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.statusText);
  }
}
