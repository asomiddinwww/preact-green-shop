import axios from "axios";
import Cookies from "js-cookie";

interface AxiosType {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  param?: object; // Komponentdan keladigan qo'shimcha parametrlar (masalan: search)
}

export const useAxios = () => {
  const request = ({ url, method = "GET", body, param }: AxiosType) => {
    // Cookiedan haqiqiy tokenni olaxmiz
    const token = Cookies.get("token") || Cookies.get("access_token");

    const fullUrl = `${import.meta.env.VITE_BASE_URL}/${url}`.replace(
      /([^:]\/)\/+/g,
      "$1",
    );

    return axios({
      url: fullUrl,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      data: body,
      params: {
        access_token: token,
        ...param,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        console.error("API Xatosi:", {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          url: fullUrl,
        });
        throw error;
      });
  };

  return request;
};
