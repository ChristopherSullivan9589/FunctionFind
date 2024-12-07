import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path based on your setup
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import './BrowseEvents.css';
import { getEventRecommendations } from '../recommendations';

function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [eventName, setEventName] = useState(''); // State for event name
  const [organizerName, setOrganizerName] = useState(''); // State for organizer name

  useEffect(() => {
    const fetchEvents = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // Fetch hosted events by the current user
        const hostedEventsQuery = query(collection(db, 'events'), where('user', '==', user.uid));
        const hostedEventsSnapshot = await getDocs(hostedEventsQuery);
        const hostedEventsList = hostedEventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Get recommendations based on hosted events and search criteria
        const recs = await getEventRecommendations(hostedEventsList, { eventName, organizerName });
        setRecommendedEvents(recs);
      }

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
  }, [eventName, organizerName]); // Add eventName and organizerName as dependencies

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Function to handle event name change
  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  // Function to handle organizer name change
  const handleOrganizerNameChange = (e) => {
    setOrganizerName(e.target.value);
  };

  // Filtered events based on search term and selected category
  const filteredEvents = events.filter((event) => {
    const matchesLocation = event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
    const matchesEventName = eventName ? event.eventName.toLowerCase().includes(eventName.toLowerCase()) : true;
    const matchesOrganizerName = organizerName ? event.organizerName.toLowerCase().includes(organizerName.toLowerCase()) : true;

    return matchesLocation && matchesCategory && matchesEventName && matchesOrganizerName;
  });

  return (
    <div className="browse-events-container">
      <header className="browse-events-header">
        <h1>Browse Events</h1>
        <p>Discover all the events listed on our platform!</p>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          placeholder="Filter by event name..."
          value={eventName}
          onChange={handleEventNameChange}
        />
        <input
          type="text"
          placeholder="Filter by organizer name..."
          value={organizerName}
          onChange={handleOrganizerNameChange}
        />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Networking">Networking</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <>
          {recommendedEvents.length > 0 && (
            <div className="recommended-events">
              <h2>Recommended for You</h2>
              <div className="events-list">
                {recommendedEvents.map((event) => (
                  <div key={event.id} className="event-card">
                    <h2>{event.eventName}</h2>
                    <p><strong>Organizer:</strong> {event.organizerName}</p>
                    <p><strong>Email:</strong> {event.email}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Category:</strong> {event.category || 'No category specified'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredEvents.length > 0 ? (
            <div className="events-list">
              {filteredEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <h2>{event.eventName}</h2>
                  <p><strong>Organizer:</strong> {event.organizerName}</p>
                  <p><strong>Email:</strong> {event.email}</p>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Description:</strong> {event.description}</p>
                  <p><strong>Category:</strong> {event.category || 'No category specified'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No events found. Check back later!</p>
          )}
        </>
      )}
    </div>
  );
}

export default BrowseEvents;