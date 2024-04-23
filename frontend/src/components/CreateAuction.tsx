import {useState,useEffect} from 'react';
import '../css/createAuction.css'; 
import { useNavigate} from "react-router-dom";
import axios from "axios"

const CreateAuction: React.FC = () => {
   const navigate = useNavigate();
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [startingPrice, setStartingPrice] = useState("");
   const [startingTime, setStartingTime] = useState("");
   const [endingTime, setEndingTime] = useState("");

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();

       try {
         if (!title || !description || !startingPrice || !startingTime || !endingTime) {
            alert("Fill in all fields");
            return;
          }
           const res = await axios.post('http://localhost:8000/auction/create', {title,description, startingPrice, startingTime, endingTime });
           console.log('Auction created successfully:', res.data);
           const auctionId = res.data.auction._id
         //   alert(auctionId)
           const username = sessionStorage.getItem("username");
           if(!username){
            alert("username not stored in session storage");
            return;
           }
         //   alert(username)
           const newRes = await axios.post('http://localhost:8000/user/updateAuctions', {username,auctionId});
           alert("auction added to user");
           navigate("/browse")
       } catch (error) {
            // alert(startingTime)
            // alert(endingTime)
           console.error('Failed to create auction:', error);
           alert(error)
       }
   };

   return (
       <div className="container_auction">
           <h1>Create Auction</h1>
           <form onSubmit={handleSubmit}>
               <label htmlFor="title">Title:</label>
               <input
                   type="text"
                   id="auctionTitle"
                   name="title"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   required
               />
               <label htmlFor="description">Description:</label>
               <textarea
                   id="description"
                   name="description"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   rows={4}
                   required
               />
               <label htmlFor="startingPrice">Starting Price:</label>
               <input
                   type="number"
                   id="startingPrice"
                   name="startingPrice"
                   value={startingPrice}
                   onChange={(e) => setStartingPrice(e.target.value)}
                   min={0}
                   step={1}
                   required
               />
               <label htmlFor="startTime">Start Time:</label>
               <input
                   type="datetime-local"
                   id="startTime"
                   name="startTime"
                   value={startingTime}
                   onChange={(e) => setStartingTime(e.target.value)}
                   required
               />
               <label htmlFor="endTime">End Time:</label>
               <input
                   type="datetime-local"
                   id="endTime"
                   name="endTime"
                   value={endingTime}
                   onChange={(e) => setEndingTime(e.target.value)}
                   required
               />
               <button type="submit">Create Auction</button>
           </form>
       </div>
   );
};
export default CreateAuction;