import axios from "axios";

export default async function editPostAction(params, formData) {
  try {
    await axios.put(
      `http://localhost:3000/author/posts/${params.post_id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
  } catch (error) {
    return error.response.data;
  }
}
