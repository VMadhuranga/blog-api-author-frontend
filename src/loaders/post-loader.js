import axios from "axios";

export default async function postLoader(baseUrl, params) {
  try {
    const response = await axios.get(
      `${baseUrl}/author/posts/${params.post_id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
