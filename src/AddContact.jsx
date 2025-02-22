import React, { useState, useEffect } from "react";
import axios from 'axios';

import { ToastContainer, toast, Bounce } from 'react-toastify';

const AddContact = ({ url, reload, setReload, setId, editData, setEditData }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
      setShowModal(true);
    }
  }, [editData]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted Data:", formData);

    try {
      let response;
      if (editData) {
        response = await axios.put(`${url}/update/contact/${editData._id}`, formData, {
          headers: { "Content-Type": "application/json" },
        });
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
      } else {
        response = await axios.post(`${url}/contact`, formData, {
          headers: { "Content-Type": "application/json" },
        });
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
      }

      console.log("API Response:", response.data);
      setFormData({ name: "", email: "", phone: "" });
      setShowModal(false);
      setReload(!reload);
      setEditData(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div
        className={`container text-center mt-0 mb-4 ${showModal ? "modal-open" : ""}`}
        style={showModal ? { filter: "blur(5px)" } : {}}
      >
        <button
          type="button"
          className="btn btn-primary btn-lg fw-bold shadow-lg px-4 py-2"
          onClick={() => {
            setFormData({ name: "", email: "", phone: "" }); // Reset form
            setEditData(null); // Ensure fresh form
            setShowModal(true);
          }}
          style={{ fontFamily: "monospace" }}
        >
          {editData ? "Edit Contact" : "Add Contact"}
        </button>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          aria-labelledby="addContactModalLabel"
          aria-hidden="true"
          role="dialog"
          style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(0, 0, 0, 0.3)", fontFamily: "monospace" }}
        >
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white rounded-4 shadow-lg p-4">
              <div className="modal-header border-secondary ">
                <h5 className="modal-title fs-2 fw-bold" id="addContactModalLabel">
                  {editData ? "Edit Contact Details" : "Fill User Details"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  style={{ transform: "scale(0.7)" }}
                  onClick={() => {
                    setShowModal(false);
                    setEditData(null);
                  }}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label text-white fs-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control bg-secondary text-white border-0 rounded-3 p-2 shadow-sm"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white fs-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control bg-secondary text-white border-0 rounded-3 p-2 shadow-sm"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label text-white fs-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="form-control bg-secondary text-white border-0 rounded-3 p-2 shadow-sm"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  <div className="modal-footer border-secondary d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-outline-light px-4 py-2 shadow-sm"
                      onClick={() => {
                        setShowModal(false);
                        setEditData(null);
                      }}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-success px-4 py-2 shadow-sm">
                      {editData ? "Update Contact" : "Save Contact"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddContact;
