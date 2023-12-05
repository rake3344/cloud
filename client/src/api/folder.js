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

export const getFolder = async (folder_id) => {
  try {
    const res = await axios.get(`/folder/${folder_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};
