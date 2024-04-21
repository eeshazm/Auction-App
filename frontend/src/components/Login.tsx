import { FormEvent, useState } from "react";
import "../css/login.css"
import { useNavigate} from "react-router-dom";
import axios from "axios"

const Login = () => {
  const history =useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin (e: FormEvent<HTMLFormElement>){
    e.preventDefault(); 
    try{
       if (!username || !password) {
          alert("Please fill in all fields.");
          return;
        }
        await axios.post("http://localhost:8000/user/", {username,password})
      .then(res=>{
        console.log(res.data)
        if(res.data ="Login successful" ){
          history("/home")
        }
        else if (res.data ="User not found"){
          alert("User not found")
        }
        else if (res.data ="Invalid password"){
          alert("Invalid password")
        }
        else{
          alert(res.data)
        }
      })
      .catch(e=>{
        alert("Login failed")
        console.log(e)
      })

    }
    catch(e){
      console.log(e);
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </div>
        <div className="form-group signup-link">
          Don't have an account? <a href="http://localhost:3000/signup">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
