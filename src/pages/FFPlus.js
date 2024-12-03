import React from 'react';
import './FFPlus.css'; // Make sure to style the page accordingly

function FFPlus() {
  return (
    <div className="ffplus-container">
      <header className="ffplus-header">
        <h1>Welcome to FFPlus</h1>
        <p>Take your party experience to the next level with exclusive perks and features!</p>
      </header>
      
      <section className="ffplus-features">
        <h2>Why Join FFPlus?</h2>
        <ul>
          <li><strong>Ad-Free Experience:</strong> Browse without interruptions for a seamless experience.</li>
          <li><strong>Personalized Party Recommendations:</strong> Get curated events based on your interests.</li>
          <li><strong>Exclusive Discounts:</strong> Save on tickets with subscriber-only deals.</li>
          <li><strong>Advanced Filters:</strong> Find events by music genre, crowd size, or ticket price.</li>
          <li><strong>Subscriber-Only Forums:</strong> Connect and chat with like-minded party-goers.</li>
        </ul>
      </section>
      
      <section className="ffplus-pricing">
        <h2>FFPlus Pricing</h2>
        <p>Unlock all these features for just <strong>$9.99/month</strong>!</p>
      </section>
      
      <section className="ffplus-cta">
        <h3>Don't Miss Out!</h3>
        <button className="subscribe-button" onClick={() => alert('Redirecting to subscription page!')}>
          Subscribe to FFPlus Now
        </button>
      </section>
      
      <footer className="ffplus-footer">
        <p>Experience the future of party planning with FFPlus.</p>
        <p>&copy; {new Date().getFullYear()} Function Find. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default FFPlus;