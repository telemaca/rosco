import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.ROSCO_API_KEY!;

  try {
    const res = await fetch(`${process.env.ROSCO_API_URL}definitions/rosco`, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
