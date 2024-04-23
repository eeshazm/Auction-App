import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!oldPassword || !password || password !== confirmPassword) {
                alert("Please fill in all fields correctly.");
                return;
            }

            const username = sessionStorage.getItem("username");
            const response = await axios.post("http://localhost:8000/user/updatePassword", {
                username,
                oldPassword,
                newPassword: password,
            });

            if (response.status === 200) {
                alert('Password changed successfully');
                navigate("/");
            } else {
                setErrorMessage("Failed to change password. Please try again.");
            }
        } catch (error) {
            console.error('Failed to change password:', error);
            alert("Failed to change password. Please try again.");
        }
    };

    return (
        <div className="password_container">
            <form className="password-form" onSubmit={handlePasswordChange}>
                <h2>Password Change</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="form-group">
                    <label htmlFor="oldPassword">Old Password</label>
                    <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        placeholder="Enter your old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your new password"
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
                        placeholder="Re-enter your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Change Password</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
