# Playlist Generator App

### Overview

This app allows users to create personalized playlists based on their Spotify account's liked songs, as well as from selected genres and date ranges. It uses the Spotify API to fetch user data and build custom playlists according to the user's preferences.

### Features

- **Generate Playlists Based on Liked Songs**: Automatically create playlists from the songs the user has liked on Spotify.
- **Genre-based Playlist Creation**: Generate playlists based on specific genres selected by the user.
- **Date Range Filtering**: Create playlists with songs released within a specific time frame, e.g., last year, last month, etc.
- **Spotify Integration**: Integrates with the Spotify API to retrieve user data such as liked songs, genres, and track release dates.
- **User Control**: Allows users to filter and create playlists based on their listening habits and preferences.

### Technologies Used

- **Frontend**: React (for the user interface)
- **Backend**: Node.js with Express (for handling API requests)
- **Spotify API**: Fetches user data like liked songs, genres, and track release dates.
- **Authentication**: OAuth 2.0 (for authenticating with Spotify)

### Installation

#### Prerequisites

- Node.js
- npm
- Spotify Developer Account (for API keys)

#### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/playlist-generator-app.git
   cd playlist-generator-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Spotify API credentials:

   - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
   - Create a new app to get the `CLIENT_ID` and `CLIENT_SECRET`.
   - Set your redirect URI to match the one in your app configuration.

4. Create a `.env` file and add your credentials:

   ```env
   SPOTIFY_CLIENT_ID=your-client-id
   SPOTIFY_CLIENT_SECRET=your-client-secret
   REDIRECT_URI=http://localhost:3000/callback
   ```

5. Run the app:

   ```bash
   npm start
   ```

6. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

### Usage

1. **Login with Spotify**: Click the "Login with Spotify" button to authenticate your Spotify account and access your liked songs.
2. **Generate Playlist**:
   - **From Liked Songs**: Automatically generate playlists using the tracks you've liked on Spotify.
   - **From Genre**: Select a genre and generate a playlist based on songs from that genre.
   - **From Date Range**: Select a date range (e.g., last year, last month) to generate a playlist from songs released within that period.
3. **Customize Playlist**: Filter and fine-tune playlists based on your selected criteria.
