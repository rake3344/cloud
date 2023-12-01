import axios from "axios";

const token = localStorage.getItem("token");

export const createFolder = (name) => {
  try {
    const res = axios.post("/folder", name, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};
