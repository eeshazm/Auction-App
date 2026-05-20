import {useState,useEffect} from 'react';
import '../css/profile.css'; 
import { useNavigate} from "react-router-dom";
import axios from "axios"
import { Auction } from '../types';


const Profile: React.FC = () => {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const navigate = useNavigate();
    const username = sessionStorage.getItem("username");

    useEffect(() => {
        axios.post<{ auctionsCreated: Auction[] }>('http://localhost:8000/user/auctions', { username })
            .then(response => {
                setAuctions(response.data.auctionsCreated);
            })
            .catch(error => {
                console.error('Error fetching auctions:', error);
            });
    }, []);
    return (
        <div className="profile_container">
            <div className="profile-info">
                <div className="user-details">
                    <h2>Name: {username}</h2>
                    <p>Username: {username}</p>
                </div>
            </div>
            <div className="profile-actions">
                <button onClick={() => navigate('/createAuction')}>Create Auction</button>
                <button onClick={() => navigate('/updatePassword')}>Update Password</button>
            </div>
            <h3>My Auctions</h3>
            <div className="auction-list">
                {auctions.map((auction, index) => (
                    <div key={index} className="auction-card">
                        <h4>{auction.title}</h4>
                        <p>{auction.description}</p>
                        <p>Starting Price: ${auction.startingPrice}</p>
                        <p>Current Price: ${auction.currentPrice}</p>
                        <p>Start Time: {auction.startTime}</p>
                        <p>End Time: {auction.endTime}</p>
                        <p>Status: {auction.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
