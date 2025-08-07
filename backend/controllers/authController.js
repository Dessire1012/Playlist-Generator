const { getAccessToken } = require("../services/spotifyService");

exports.login = (req, res) => {
  const scope =
    "user-library-read playlist-modify-public playlist-modify-private";
  const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
    process.env.SPOTIFY_CLIENT_ID
  }&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
    process.env.REDIRECT_URI
  )}`;
  res.redirect(authURL);
};

exports.callback = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing" });
  }

  try {
    const tokenRes = await getAccessToken(code);
    res.json(tokenRes.data);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Token exchange failed", details: err.message });
  }
};
