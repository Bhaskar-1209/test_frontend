import React, { useEffect, useState } from "react";
import axios from "axios";

const MyUploads = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://test-backend-o1r6.onrender.com/api/my-uploads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUploads(res.data);
    };

    fetchUploads();
  }, []);

  return (
    <div>
      <h2>My Uploads</h2>
      {uploads.map((upload) => (
        <div key={upload._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h4>{upload.title}</h4>
          <p>{upload.description}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            {upload.images.map((img, idx) => (
              <img key={idx} src={img.base64} alt={img.name} style={{ width: "150px" }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyUploads;
