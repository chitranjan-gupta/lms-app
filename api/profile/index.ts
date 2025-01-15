import { client } from "../common/client";

export const logIn = async (email: string, password: string) => {
  const response = await client.post(`user/signin`, {
    email: email,
    password: password,
  });
  return response.data;
};

export const logOut = async (token: { access: string; refresh: string }) => {
  const response = await client.get(`user/logout`, {
    headers: {
      Authorization: `Bearer ${token?.access}`,
    },
  });
  return response.data;
};

export const getMe = async (token: { access: string; refresh: string }) => {
  const response = await client.get(`user/auth`, {
    headers: {
      Authorization: `Bearer ${token?.access}`,
    },
  });
  return response.data;
};

export const refresh = async (token: { access: string; refresh: string }) => {
  const response = await client.get(`user/refresh`, {
    headers: {
      Authorization: `Bearer ${token?.access}`,
    },
  });
  return response.data;
};

export const register = async (
  name: string,
  email: string,
  username: string,
  password: string,
) => {
  const response = await client.post(`user/signup`, {
    name: name,
    email: email,
    username: username,
    password: password,
  });
  return response.data;
};
