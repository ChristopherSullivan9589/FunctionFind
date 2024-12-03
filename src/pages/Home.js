import React from 'react';
import './Home.css';
import functionFindImage from '../images/function-find.png';
import ThreeDImage from "../images/3dla.jpg" ;

function Home() {
  return (
    <div>
      <div className="home">
        <header className="hero-section">
          <img src={functionFindImage} alt="Function Find" />
          <h1>Find the Best Events Near You</h1>
          <p>Discover, plan, and make unforgettable memories.</p>
          <button className="cta-button">Explore Now</button>
        </header>
        <section className="features" />
      </div>
      <div className="center">
        <img src={ThreeDImage} alt="3d" />
      </div>
      <div className="center-text">
        <p>Our 3D map shows you live events happening in your area. Navigate through different neighborhoods and find everything from parties to music festivals in a fun, interactive way. Tap on any event marker to see details, purchase tickets, and get directions</p>

      </div>
      <div className="right">
        <h2>Find your Function!</h2>
        <p style={{lineHeight: "2"}}>
          Function Find is your ultimate event discovery platform. Explore and attend the most exciting parties, concerts, and gatherings using our interactive 3D map. 
          Easily purchase tickets, track event times, and connect with local hosts—all in one place.
        </p>

        <h2>How It Works</h2>
        <p style={{lineHeight: "2"}}>
          Description:<br />
          "Finding your next event is as easy as 1, 2, 3!"<br />
          Step 1: "Explore the Map"<br />
          "Open the Function Find app and explore your city in 3D. See live event markers for parties, concerts, and more."<br />
          Step 2: "Tap for Details"<br />
          "Tap on any event marker to view details like event type, time, location, and ticket prices."<br />
          Step 3: "Purchase and Attend"<br />
          "Purchase tickets directly through the app and get directions to the event—it's that simple!" 
        </p>
      </div>
    </div>
  );
}

export default Home;