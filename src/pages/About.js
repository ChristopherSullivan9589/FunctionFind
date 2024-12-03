import React from 'react';
import './About.css'; // Make sure this file contains your custom styles

function About() {
  return (
    <div className="about" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="story" style={{ flex: '1', marginRight: '20px', lineHeight: '2' }}>
        <h1>Our story</h1>
        <p>
          
Function Find was born out of a passion for events and technology. Our founders noticed how hard it could be to find and attend local events without spending hours searching through different apps and websites. Inspired by interactive apps like Pokémon Go, they set out to create a platform that brings events to life in a whole new way. Today, Function Find helps users discover parties, concerts, and local functions using an intuitive 3D map, making it easier than ever to explore what your city has to offer.
        </p>
      </div>
      <div className="team" style={{ flex: '1', marginLeft: '20px',  lineHeight: '2'}}>
        <h1>Our Team</h1>
        <p>
        We are a team of tech enthusiasts, event planners, and designers committed to transforming how people experience events. Our diverse backgrounds allow us to innovate and create solutions that truly resonate with our users.
        </p>
      </div>
    </div>
  );
}

export default About;