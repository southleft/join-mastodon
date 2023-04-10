import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function FollowSuggestions() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [validatedEmail, setValidatedEmail] = useState(false);

  const suggestedUsers = [
    { id: "13179", username: "Mastodon", url: "https://mastodon.social/@Mastodon" },
    { id: "1", username: "Gargron", url: "https://mastodon.social/@Gargron" },
    { id: "110159296321902051", username: "tpitre", url: "https://mastodon.social/@tpitre" },
  ];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/authenticate", {
        email,
        password,
      });

      // Store the access token for future authenticated requests
      sessionStorage.setItem("accessToken", response.data.data.access_token);

      setValidationMessage("Authenticated successfully");
    } catch (error) {
      setValidationMessage(`Error: ${JSON.stringify(error.response.data)}`);
    }
  };

  const followUser = async (targetAccountId) => {
    const accessToken = sessionStorage.getItem("accessToken");

    try {
      const response = await axios.post("/api/follow", {
        accessToken,
        targetAccountId,
      });

      alert(`You are now following ${response.data.data.acct}`);
    } catch (error) {
      alert(`Error: ${JSON.stringify(error.response.data)}`);
    }
  };

  return (
    <div>
      <h1>Follow Suggestions</h1>
      <p>
        Please check your email and click the confirmation link. Once
        confirmed, click the button below and log in to authenticate and view suggested users to
        follow.
      </p>
      <button onClick={() => setValidatedEmail(true)}>I have validated my email, proceed</button>
      {validatedEmail && (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">Log in & Authenticate</button>
          </form>
          {validationMessage && <div>{validationMessage}</div>}
          {/* Render the suggested users list */}
          <div>
            <h2>Suggested Users</h2>
            <ul>
              {suggestedUsers.map((user) => (
                <li key={user.id}>
                  <a href={user.url} target="_blank" rel="noopener noreferrer">{user.username}</a>{" "}
                  <button onClick={() => followUser(user.id)}>Follow</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <button onClick={() => router.push("/")}>Back to Signup</button>
    </div>
  );
}
