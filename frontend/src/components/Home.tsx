import React from 'react';
import '../css/home.css';
import { useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleJoinNow = () => {
    console.log('Join Now button clicked');
    navigate("/browse")
  };

  return (
    <div className="container_home">
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
