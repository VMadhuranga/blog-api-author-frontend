import axios from "axios";

export default async function authorLoginAction(baseUrl, formData) {
  try {
    const response = await axios.post(`${baseUrl}/author/login`, formData);

    localStorage.setItem("token", response.data.token);
  } catch (error) {
    return error.response.data;
  }
}
