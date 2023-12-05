import axios from "axios";

export const shareFile = async (file_id, received_user_id) => {
  try {
    const res = await axios.post(
      `/share`,
      { file_id, received_user_id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getSharedFiles = async () => {
  try {
    const res = await axios.get("/shared-files", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};
