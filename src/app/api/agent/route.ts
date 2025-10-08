import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Agent endpoint placeholder.",
      reply: null
    },
    { status: 202 }
  );
}
