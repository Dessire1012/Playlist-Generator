import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !accessToken) {
      // Exchange code for access token
      axios
        .get(`http://127.0.0.1:3001/auth/callback?code=${code}`)
        .then((res) => {
          setAccessToken(res.data.access_token);
          window.history.replaceState({}, null, "/");
        })
        .catch((err) => {
          console.error("Token exchange failed:", err);
        });
    }
  }, [accessToken]);

  const handleSubmit = async () => {
    if (!userPrompt || !accessToken) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3001/playlist/process-prompt",
        {
          prompt: userPrompt,
          accessToken: accessToken,
        }
      );

      setResponse(
        `✅ Playlist created! 👉 [Open it here](${res.data.playlistUrl})`
      );
    } catch (err) {
      setResponse("❌ Error creating playlist");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Spotify Playlist Creator</h1>
      {accessToken ? (
        <div>
          <h2>Logged in!</h2>
        </div>
      ) : (
        <button
          onClick={() =>
            (window.location.href = "http://localhost:3001/auth/login")
          }
        >
          Login with Spotify
        </button>
      )}

      <h1>Enter Playlist Prompt</h1>
      <textarea
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        placeholder="Describe the playlist you want!"
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Submit"}
      </button>

      {userPrompt && (
        <div>
          <h3>Your Prompt:</h3>
          <p>{userPrompt}</p>
        </div>
      )}

      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
