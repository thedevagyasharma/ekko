import { getSpotifyAccessToken } from "@/lib/getSpotifyAccessToken";

const accessToken = await getSpotifyAccessToken();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ error: "Missing search query" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=10`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
    }
  );

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
