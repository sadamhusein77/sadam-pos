import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_URL_API_POS;
const API_VERSION = "v1";

const apiService = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
});

let isRefreshing = false;
let refreshSubscribers = [];

// Request interceptor
apiService.interceptors.request.use(async (config) => {
  const token = Cookies.get("access-token-pos");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
apiService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { data, status } = error.response || {};

    if (status === 401) {
      const originalRequest = error.config;
      const refreshToken = Cookies.get("refresh-token-pos");

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // Use the refresh token to get a new access token
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const newAccessToken = response.data.access_token;
          Cookies.set("access-token-pos", newAccessToken, { expires: 1 });

          // Update the original request with the new access token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry the original request
          return axios(originalRequest);
        } catch (error) {
          console.error("Error refreshing token:", error);
          // Redirect to login page or handle token refresh failure
        } finally {
          isRefreshing = false;
        }
      } else {
        // Wait for the new access token to be received and retry the original request
        return new Promise((resolve) => {
          refreshSubscribers.push((newAccessToken: any) => {
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            resolve(axios(originalRequest));
          });
        });
      }
    }

    console.log(data?.message || "An error occurred")
    return Promise.reject(error);
  }
);

export default apiService;