import { NextResponse } from "next/server";
import { idsfind } from "idsfind";
import { ResponseJson } from "@/types";



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  if (term) {
    const results = idsfind(term);
    const responseJson: ResponseJson = { term, count: results.length, results };
    return NextResponse.json(responseJson);
  }

  return NextResponse.json({ msg: "No term provided" });
}
