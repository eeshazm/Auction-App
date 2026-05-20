import {useState,useEffect} from 'react';
import '../css/browse.css'; 
import axios from "axios"
import { Auction } from '../types';
import React from 'react';

const Browse: React.FC = () => {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    useEffect(() => {
    axios.get< { auctions: Auction[] } >('http://localhost:8000/auction/')
        .then(response => {
            setAuctions(response.data.auctions);
        })
        .catch(error => {
            console.error('Error fetching auctions:', error);
        });
}, []);

    return (
        <div className="container_browse">
            <div className="search-container">
                <input type="text" placeholder="Search..." />
                <button>Search</button>
            </div>
            {auctions.map((auction, index) => (
                <div key={index} className="auction-card">
                    <div className="auction-details">
                        <h2 className="auction-title">{auction.title}</h2>
                        <p className="description">{auction.description}</p>
                        <p>Starting Price: ${auction.startingPrice}</p>
                        <p>Current Price: ${auction.currentPrice}</p>
                        <p>Status: {auction.status}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Browse;
