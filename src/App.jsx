import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Form from "./components/Form";
import Invoice2 from "./components/invoice/invoice2";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    setIsUpdating(true); // show shimmer while updating
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // simulate a tiny delay to show shimmer effect
    setTimeout(() => {
      setIsUpdating(false);
    }, 300); // 0.3s delay
  };

  // Detect mobile devices
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  
  if (isMobile) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Hi, this is Rocky's page — only works on PC</h2>
      </div>
    );
  }

  return (
    <div className="flex gap-8 p-4">
      <Form formData={formData} handleChange={handleChange} />

      <div className="invoice-container">
        {isUpdating ? (
          <div
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              width: "400px",
            }}
          >
            <Skeleton
              height={30}
              width={250}
              style={{ marginBottom: "10px" }}
            />
            <Skeleton
              height={20}
              width={350}
              style={{ marginBottom: "10px" }}
            />
            <Skeleton
              height={20}
              width={300}
              style={{ marginBottom: "10px" }}
            />
            <Skeleton height={50} width={50} circle={true} />
          </div>
        ) : (
          <Invoice2 formData={formData} />
        )}
      </div>
    </div>
  );
}
