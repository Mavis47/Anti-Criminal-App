import axios from "axios";
import "../styles/friends.css";
import { useState } from "react";
import { useAuth } from "../contexts/auth.context";

export default function Friends() {

  const {isAuthenticated} = useAuth();
  const [id, setId] = useState<number>();
  console.log(id);

  const handleSendRequests = async () => {
    const data = await axios.post(`http://localhost:5001/api/request/sendRequest`,{receiverId: id},{
        headers:{
            'Authorization': `Bearer ${isAuthenticated}`
        }
    });
    console.log("Data When Sending request",data);
    if(data){
        alert("Send the request")
    }
  };

  return (
    <div className="friend-container">
      <div className="friend-request-form">
        <h1 className="heading">Fill the field to send a Request</h1>
        <form action="" method="post" onSubmit={(e) => e.preventDefault()}>
          <input
            className="send-request-field"
            type="number"
            placeholder="Enter Id of User..."
            onChange={(e) => setId(Number(e.target.value))}
          />
          <button className="btn" onClick={handleSendRequests}>
            Send
          </button>
        </form>
        <button className="btn">Undo</button>
      </div>
      <div className="show-friends">
        <h1 className="friend-count">All Friend()</h1>
        <div className="friend-card-container">
          <div className="container2">
            <div className="friend-card">is your friend</div>
            <button className="msg">Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}
