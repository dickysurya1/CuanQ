import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getBalance = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/account/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
