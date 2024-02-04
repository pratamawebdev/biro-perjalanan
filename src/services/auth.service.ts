import axios, { AxiosResponse, AxiosError } from "axios";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

interface UserCallback {
  (success: boolean, userDataOrError: UserData | string): void;
}

interface AuthCallback {
  (success: boolean, tokenOrError: string): void;
}

export const login = (data: LoginData, callback: AuthCallback): void => {
  axios
    .post("https://biroperjalanan.datacakra.com/api/authaccount/login", data)
    .then((res: AxiosResponse) => {
      const { Token, Id } = res.data.data;

      localStorage.setItem("token", Token);
      localStorage.setItem("userId", Id);

      callback(true, Token);
    })
    .catch((error: AxiosError) => {
      const errorMessage = error.message || "An error occurred during login.";

      callback(false, errorMessage);
    });
};

export const register = (data: RegisterData, callback: AuthCallback): void => {
  axios
    .post("https://biroperjalanan.datacakra.com/api/authaccount/login", data)
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const getUser = (callback: UserCallback): void => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    callback(false, "Token or user ID is missing");
    return;
  }

  axios
    .get(`https://biroperjalanan.datacakra.com/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: AxiosResponse<UserData>) => {
      const userData = res.data;
      callback(true, userData);
    })
    .catch((err: AxiosError<unknown>) => {
      console.error(err);
      callback(false, "Error fetching user data");
    });
};
