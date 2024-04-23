import {useState,useEffect} from 'react';
import '../css/profile.css'; 
import { useNavigate} from "react-router-dom";
import axios from "axios"

interface Auction {
    title: string;
    description: string;
    startingPrice: number;
    currentPrice: number;
    startTime: string;
    endTime: string;
    status: string;
}

// const auctions: Auction[] = [
//     {
//         title: 'Auction 1',
//         description: 'Description of Auction 1 goes here.',
//         startingPrice: 100,
//         currentPrice: 120,
//         startTime: '10:00 AM',
//         endTime: '12:00 PM',
//         status: 'Ongoing',
//     },
//     {
//         title: 'Auction 2',
//         description: 'Description of Auction 2 goes here.',
//         startingPrice: 50,
//         currentPrice: 70,
//         startTime: '11:00 AM',
//         endTime: '1:00 PM',
//         status: 'Concluded',
//     },
// ];

const Profile: React.FC = () => {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<Auction[]>('http://localhost:8000/user/auctions')
            .then(response => {
                setAuctions(response.data); 
            })
            .catch(error => {
                console.error('Error fetching auctions:', error);
            });
    }, []);
    return (
        <div className="profile_container">
            <div className="profile-info">
                <div className="user-details">
                    <h2>Name: John Doe</h2>
                    <p>Username: johndoe123</p>
                </div>
            </div>
            <div className="profile-actions">
                <button onClick={() => window.location.href = 'http://localhost:3000/createAuction'}>Create Auction</button>
                <button onClick={() => window.location.href = '#'}>Update Password</button>
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
