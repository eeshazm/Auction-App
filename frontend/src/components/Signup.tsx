import { useState } from "react";
import "../css/signup.css";
import { useNavigate} from "react-router-dom";
import axios from "axios"

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function  handleSignup  (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 

    try{
      if (!username || !password || password !== confirmPassword) {
        alert("Confirm password correctly.");
        return;
      }
      await axios.post("http://localhost:8000/user/signup", {username,password,confirmPassword})
      .then(res=>{
        console.log("R: ", res.data)
        if(res.data.message ==="Username already in use" ){
          alert("User already exists")
            
        }
        else if (res.data.message ==="Signup successful"){
          sessionStorage.setItem("username", username);
          navigate("/home")
        }
        else{
          alert(res.data)
        }
      })
      .catch(e=>{
        alert(e)
        console.log(e)
      })
    }
    catch(e){
      console.log(e);
    }

  };

  return (
    <div className="signup_container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Signup</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Sign Up</button>
        </div>
        <div className="form-group signup-link">
          Already have an account? <a href="http://localhost:3000/">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
