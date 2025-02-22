import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import AddContact from "./AddContact";

import { ToastContainer, toast, Bounce } from 'react-toastify';

const getRandomColor = () => {
  const colors = [
    "bg-primary",
    "bg-secondary",
    "bg-success",
    "bg-danger",
    "bg-warning",
    "bg-info",
    "bg-primary-emphasis",
    "bg-success-emphasis",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [reload, setReload] = useState(false);
  const [id, setId] = useState("");
  const [editData, setEditData] = useState(null);

  const url = import.meta.env.VITE_API_URL;
  // Fetch contacts from API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Fetched Contacts:", response.data.contacts);
      setContacts(response.data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  // Delete contact
  const deleteContact = async (id) => {
    try {
      const response = await axios.delete(`${url}/delete/contact/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("API Response:", response.data);
      
      toast.success(response.data.msg, {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });

      setReload(!reload);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-black text-light py-5">
      <h1
        className="text-center text-light mb-4 fs-1 fw-bold"
        style={{ fontFamily: "monospace" }}
      >
        User Contact Details
      </h1>

      <div className="d-flex gap-5 mb-3 fs-1">
        <AddContact url={url} fetchData={fetchData} reload={reload} setReload={setReload} setId={setId} editData={editData} setEditData={setEditData} />
      </div>

      <div className="w-75 d-flex flex-column gap-4">
        {contacts.map((data) => (
          <div
            key={data._id}
            className="card bg-dark text-light shadow-lg border-0 p-4 d-flex flex-column flex-md-row align-items-center align-items-md-start position-relative"
            style={{
              width: "100%",
              minHeight: "180px",
              borderRadius: "15px",
              fontFamily: "monospace",
            }}
          >
            <div className="mb-3 mb-md-0 me-md-4 d-flex justify-content-center">
              <div
                className={`bg-secondary rounded-circle d-flex justify-content-center align-items-center ${getRandomColor()}`}
                style={{
                  width: "80px",
                  height: "80px",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                {data.name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="card-body text-center text-md-start">
              <h3 className="card-title fw-bold">Name: {data.name}</h3>
              <p className="card-text fs-5">
                <i className="bi bi-envelope"></i> : {data.email}
              </p>
              <p className="card-text fs-5">
                <i className="bi bi-telephone"></i> : {data.phone}
              </p>
            </div>

            <div className="d-flex gap-2 mt-3 mt-md-3 position-relative flex-column">
              <button className="btn btn-outline-primary btn-lg" onClick={() => setEditData(data)}>Edit</button>
              <button className="btn btn-outline-danger btn-lg" onClick={() => deleteContact(data._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
