import axios from "axios";

export default async function authorLoginAction(formData) {
  try {
    const response = await axios.post(
      "http://localhost:3000/author/login",
      formData,
    );

    localStorage.setItem("token", response.data.token);
  } catch (error) {
    return error.response.data;
  }
}
