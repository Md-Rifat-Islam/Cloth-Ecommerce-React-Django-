//fromtend/src/utils/useAxios.jsx

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000/posts";

const axiosInstance = axios.create({
  baseURL,
});

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  axiosInstance.interceptors.request.use(req => {
    if (authTokens) {
      req.headers.Authorization = `Bearer ${authTokens.access}`;
    }
    return req;
  });

  axiosInstance.interceptors.response.use(
    response => response, // Return response if successful
    async error => {
      const originalRequest = error.config;

      // If the error response is 401 (Unauthorized) and we have a refresh token, attempt refresh
      if (error.response.status === 401 && authTokens?.refresh && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: authTokens.refresh,
          });

          localStorage.setItem("authTokens", JSON.stringify(response.data));
          setAuthTokens(response.data);
          setUser(jwtDecode(response.data.access));

          axiosInstance.defaults.headers.Authorization = `Bearer ${response.data.access}`;
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

          return axiosInstance(originalRequest); // Retry the original request
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Optionally: Log out user if refresh fails
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
