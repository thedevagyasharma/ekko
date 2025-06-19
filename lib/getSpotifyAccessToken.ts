let cachedToken: string | null = null;
let tokenExpiresAt = 0;

export async function getSpotifyAccessToken() {
  const now = Date.now();

  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
  });

  const data = await res.json();

  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000 - 60_000;

  return cachedToken;
}