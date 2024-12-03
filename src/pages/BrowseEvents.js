import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust path to your Firebase setup
import './BrowseEvents.css';

function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventList);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="browse-events-container">
      <header className="browse-events-header">
        <h1>Browse Events</h1>
        <p>Discover all the events listed on our platform!</p>
      </header>
      
      {loading ? (
        <p>Loading events...</p>
      ) : events.length > 0 ? (
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h2>{event.eventName}</h2>
              <p><strong>Organizer:</strong> {event.organizerName}</p>
              <p><strong>Email:</strong> {event.email}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Description:</strong> {event.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found. Check back later!</p>
      )}
    </div>
  );
}

export default BrowseEvents;