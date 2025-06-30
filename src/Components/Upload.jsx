import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [form, setForm] = useState({ title: "", description: "", images: [] });
  const [msg, setMsg] = useState("");

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length !== 2) {
      setMsg("Please select exactly 2 images");
      return;
    }

    const convert = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () =>
          resolve({ name: file.name, type: file.type, base64: reader.result });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const images = await Promise.all(files.map(convert));
    setForm({ ...form, images });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://test-backend-o1r6.onrender.com/api/upload", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMsg("Upload successful!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload 2 Base64 Images</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <input type="file" accept="image/*" multiple onChange={handleFiles} />
        <button type="submit">Upload</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default Upload;
