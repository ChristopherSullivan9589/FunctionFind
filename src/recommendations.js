import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the path based on your setup

export const getEventRecommendations = async (userHostedEvents, searchCriteria) => {
  const userCategories = userHostedEvents.map(event => event.category);
  const uniqueCategories = [...new Set(userCategories)];

  const allEvents = await getDocs(collection(db, 'events'));
  const allEventsList = allEvents.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Filter events based on categories of hosted events
  const recommendedEvents = allEventsList.filter(event => {
    const matchesCategory = uniqueCategories.includes(event.category);
    const notHostedByUser = !userHostedEvents.some(userEvent => userEvent.id === event.id);

    // Additional filters for search criteria
    const matchesEventName = searchCriteria.eventName ? 
      event.eventName.toLowerCase().includes(searchCriteria.eventName.toLowerCase()) : true;
    const matchesOrganizerName = searchCriteria.organizerName ? 
      event.organizerName.toLowerCase().includes(searchCriteria.organizerName.toLowerCase()) : true;

    return matchesCategory && notHostedByUser && matchesEventName && matchesOrganizerName;
  });

  return recommendedEvents;
};