import axios from "axios";

export default async function editPostAction(baseUrl, params, formData) {
  try {
    await axios.put(`${baseUrl}/author/posts/${params.post_id}`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  } catch (error) {
    return error.response.data;
  }
}
