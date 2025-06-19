import { getSpotifyAccessToken } from "@/lib/getSpotifyAccessToken";


export async function GET(request: Request) {
    const accessToken = await getSpotifyAccessToken();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("ids");

    if (!query) {
        return new Response(JSON.stringify({ error: "Missing search query" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    


    const res = await fetch(`https://api.spotify.com/v1/audio-features?ids=${encodeURIComponent(query)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

    console.log("Using access token:", accessToken);
    console.log("Requesting audio features for:", query);
    console.log("Response status:", res.status);

    const text = await res.text(); // raw response
  console.log("Raw response:", text);

  return new Response(text, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}