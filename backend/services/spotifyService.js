const axios = require("axios");

const getAccessToken = async (code) => {
  return axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
};

const getUserId = async (accessToken) => {
  const response = await axios.get("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data.id;
};

const fetchAllLikedTracks = async (accessToken) => {
  let allTracks = [];
  let nextUrl = "https://api.spotify.com/v1/me/tracks?limit=50";

  while (nextUrl) {
    const response = await axios.get(nextUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    allTracks = [...allTracks, ...response.data.items];
    nextUrl = response.data.next;
  }

  return allTracks;
};

const addTracksToPlaylist = async (playlistId, tracks, accessToken) => {
  const trackUris = tracks
    .map((track) =>
      track.track && track.track.id ? `spotify:track:${track.track.id}` : null
    )
    .filter((uri) => uri !== null);

  return axios.post(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    { uris: trackUris },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

module.exports = {
  getAccessToken,
  getUserId,
  fetchAllLikedTracks,
  addTracksToPlaylist,
};
