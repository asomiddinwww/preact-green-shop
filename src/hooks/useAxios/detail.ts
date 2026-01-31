import axios from "axios";

export const updateAccountDetails = async (data: any) => {
  const token = localStorage.getItem("access_token");

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/user/account-details`,
    data,
    {
      params: {
        access_token: token,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
