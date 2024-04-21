import React from 'react';
import '../css/home.css';

const Home = () => {
  const handleJoinNow = () => {
    console.log('Join Now button clicked');
  };

  return (
    <div className="container">
      <div>
        <h1>Welcome to BidMe</h1>
        <p className="subtitle">Discover unique items and bid to win!</p>
        <button className="join" onClick={handleJoinNow}>
          Join Now!
        </button>
      </div>
    </div>
  );
};

export default Home;
