import axios from "axios";

export const login = async (data) => {
  try {
    const res = axios.post("/login", {
      email: data.email,
      password: data.password,
    });

    return res;
  } catch (error) {
    return error;
  }
};

export const register = async (data) => {
  try {
    const res = axios.post("/register", {
      email: data.email,
      password: data.password,
      name: data.name,
    });

    return res;
  } catch (error) {
    return error;
  }
};

export const getUser = async () => {
  try {
    const res = axios.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};
