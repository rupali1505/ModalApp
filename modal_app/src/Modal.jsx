import { useState } from "react";
import "./modal.css";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, dob, phone } = userDetails;

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (dob > today) {
      alert("Invalid date of birth. Please select a valid date.");
      return;
    }

    setUserDetails({ username: "", email: "", dob: "", phone: "" });
    setIsOpen(false);
  };

  return (
    <div>
      
      <div className="main">
        <h1>User Details Modal</h1>
        <button onClick={() => setIsOpen(true)} disabled={isOpen}>Open Form</button>
      </div>

      
      {isOpen && (
        <div className=".modal" onClick={() => setIsOpen(false)}>
          
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Fill Details</h2>

            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input
                id="username"
                type="text"
                required
                value={userDetails.username}
                onChange={handleChange}
              />

              <label>Email:</label>
              <input
                id="email"
                type="text"
                required
                value={userDetails.email}
                onChange={handleChange}
              />

              <label>Phone:</label>
              <input
                id="phone"
                type="text"
                required
                value={userDetails.phone}
                onChange={handleChange}
              />

              <label>Date of Birth:</label>
              <input
                id="dob"
                type="date"
                required
                value={userDetails.dob}
                onChange={handleChange}
              />

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
