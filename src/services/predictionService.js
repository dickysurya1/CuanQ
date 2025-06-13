import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getPrediction = async (periods) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/transactions/prediction`,
    { periods },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
