export async function GET(request: Request) {
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
        `https://api.getsong.co/search/?api_key=${process.env.GETSONGBPM_API_KEY}&type=song&lookup=${encodeURIComponent(query)}`
    );

    const data = await res.json();

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
