/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/barangs/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_PROXY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const d_pelabuhan = searchParams.get("d_pelabuhan");

  if (!API_BASE) {
    return NextResponse.json(
      { error: "API_BASE not defined" },
      { status: 500 }
    );
  }

  if (!d_pelabuhan) {
    return NextResponse.json(
      { error: "Missing d_pelabuhan parameter" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${API_BASE}/barangs?d_pelabuhan=${d_pelabuhan}`);
    const text = await res.text();

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("❌ Failed to fetch barangs:", err.message || err);
    return NextResponse.json(
      { error: "Failed to fetch barangs" },
      { status: 500 }
    );
  }
}
