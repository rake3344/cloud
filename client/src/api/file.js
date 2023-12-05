import axios from "axios";

const token = localStorage.getItem("token");

export const uploadFile = async (file) => {
  try {
    const response = axios.post("/upload", file, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const uploadFileToFolder = async (file, folderId) => {
  try {
    const response = axios.post(`/file-folder/${folderId}`, file, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getFiles = async () => {
  try {
    const res = await axios.get("/files", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteFile = (id) => {
  try {
    const res = axios.delete(`/file/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};
