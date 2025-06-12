import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getTransactions = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addTransaction = async (text) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/transactions/input`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
