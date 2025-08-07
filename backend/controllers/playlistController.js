const {
  getUserId,
  fetchAllLikedTracks,
  addTracksToPlaylist,
} = require("../services/spotifyService");
const { parseFiltersWithOpenAI } = require("../services/openaiService");
const axios = require("axios");

exports.processPrompt = async (req, res) => {
  const { prompt, accessToken } = req.body;

  if (!prompt || !accessToken) {
    console.log("Missing prompt or accessToken");
    return res
      .status(400)
      .json({ error: "Prompt and accessToken are required" });
  }

  try {
    // Log incoming data for debugging
    console.log("Prompt received:", prompt);
    console.log("AccessToken received:", accessToken);

    // Use OpenAI to interpret the user's prompt and extract filters
    const filters = await parseFiltersWithOpenAI(prompt);
    console.log("Filters:", filters); // Log the filters extracted by OpenAI

    // Fetch all liked tracks using the provided access token
    const topSongs = await fetchAllLikedTracks(accessToken);
    //console.log("Fetched top songs:", topSongs); // Log all liked tracks fetched

    // Apply all the filters (artist, date, energy, mood, genre, tempo)
    const filteredSongs = await applyFilters(topSongs, filters, accessToken);
    //console.log("Filtered songs:", filteredSongs); // Log the filtered songs

    // Check if no songs match the filter
    if (filteredSongs.length === 0) {
      console.log("No songs match the criteria");
      return res.status(400).json({ error: "No songs match the criteria" });
    }

    // Get the user ID from Spotify
    const userId = await getUserId(accessToken);
    console.log("User ID:", userId); // Log the user ID fetched from Spotify

    // Create the playlist
    const playlistRes = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: "Curated Playlist", // Playlist name
        description: "Curated based on your preferences", // Playlist description
        public: false, // Private playlist
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Playlist creation response:", playlistRes.data); // Log the response from playlist creation

    // Add filtered tracks to the playlist
    const playlistId = playlistRes.data.id;
    console.log("Playlist ID:", playlistId); // Log the playlist ID

    const tracksAdded = await addTracksToPlaylist(
      playlistId,
      filteredSongs,
      accessToken
    );
    console.log("Tracks added response:", tracksAdded); // Log the response from adding tracks to the playlist

    // Return the playlist URL
    res.json({ playlistUrl: playlistRes.data.external_urls.spotify });
  } catch (err) {
    console.error("Error processing the prompt:", err);
    res
      .status(500)
      .json({ error: "Failed to process the prompt", details: err.message });
  }
};
