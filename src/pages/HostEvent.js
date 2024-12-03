import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path based on your setup
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import './HostEvent.css';

function HostEvent() {
  const [formData, setFormData] = useState({
    eventName: '',
    organizerName: '',
    email: '',
    date: '',
    time: '',
    location: '',
    description: '',
    user: '', // This will hold the UID
  });

  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const auth = getAuth();
    const user = auth.currentUser; // Get the current user
  
    if (!user) {
      setStatusMessage('User not authenticated. Please log in.');
      return; // Stop the function execution if not authenticated
    }
  
    const eventData = { ...formData, user: user.uid }; // Add UID to formData
  
    try {
      // Save data to Firestore
      await addDoc(collection(db, 'events'), eventData);
      console.log('Form Data Submitted:', eventData);
      setSubmitted(true);
      setStatusMessage('Your event has been submitted for review.');
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatusMessage('Failed to submit your event. Please try again.');
    }
  };

  return (
    <div className="host-event">
      <h1>Host an Event</h1>
      <p>Fill out the form below to list your event on our platform.</p>

      {submitted ? (
        <div className="confirmation">
          <h2>Thank you!</h2>
          <p>{statusMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="event-form">
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
          />

          <label htmlFor="organizerName">Organizer Name:</label>
          <input
            type="text"
            id="organizerName"
            name="organizerName"
            value={formData.organizerName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit Event</button>
        </form>
      )}
    </div>
  );
}

export default HostEvent;