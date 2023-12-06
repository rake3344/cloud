import React, { useState, useEffect } from "react";
import "./ProgressBar.css";
import { getUser } from "../../../api/auth";
import ClipLoader from "react-spinners/ClipLoader";

export default function ProgressBar() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const res = async () => {
      setLoading(true);
      const user = await getUser();
      if (user && user.data.message == "User found") {
        setUser(user.data.user);
        setLoading(false);
      }
    };
    res();
  }, [user.storage]);

  const storageLimit = 300;

  const percentage = (user.storage / storageLimit) * 100;
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <ClipLoader color="black" loading={loading} size={30} />
        </div>
      ) : (
        <div>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p>
            Used: {user.storage} MB / {storageLimit} MB
          </p>
        </div>
      )}
    </>
  );
}
