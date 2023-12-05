import axios from "axios";

export const Allusers = async () => {
  try {
    const res = await axios.get("/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};
