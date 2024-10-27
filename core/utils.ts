import axios from "axios";
import { Linking } from "react-native";

import { client } from "@/api/common/client";
import { BASE_URL } from "@/constants";
import { TokenType } from "@/types";

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

export const setRequestInterceptor = ({ token }: { token: TokenType }) => {
  return client.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token.access}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

export const setResponseInterceptior = ({
  token,
  refresh,
}: {
  token: TokenType;
  refresh: (newToken: TokenType | null, logout: boolean) => Promise<void>;
}) => {
  return client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = token.refresh;
        if (refreshToken) {
          try {
            const response = await axios.get(`${BASE_URL}/user/refresh`, {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            });
            if (response.status === 200) {
              // don't use axious instance that already configured for refresh token api call
              const newAccessToken = response.data.access_token;
              const token = {
                access: response.data.access_token,
                refresh: response.data.access_token,
              };
              refresh(token, false); //set new access token
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return axios(originalRequest); //recall Api with new token
            } else if (response.status === 401) {
              refresh(null, true);
            }
          } catch (e) {
            // Handle token refresh failure
            // mostly logout the user and re-authenticate by login again
            console.log(e);
            refresh(null, true);
          }
        }
      }
      return Promise.reject(error);
    },
  );
};
