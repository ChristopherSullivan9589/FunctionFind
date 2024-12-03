import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the path based on your setup
import "./Contact.css";

const Contact = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // Status message
  const [isSubmitting, setIsSubmitting] = useState(false); // For submit button feedback

  console.log("Firestore DB initialized:", db);


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable button while submitting
    setStatus("Submitting...");

    try {
      // Save data to Firestore
      await addDoc(collection(db, "contacts"), {
        name: name,
        email: email,
        message: message,
      });
      setStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage(""); // Clear the form
    } catch (error) {
      console.error("Error saving message:", error);
      setStatus("Failed to send the message. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          required
        ></textarea>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>

      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default Contact;