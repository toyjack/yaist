import { NextResponse } from "next/server";
import { idsfind } from "idsfind";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term');

  if (term){
    const results = idsfind(term);
    return NextResponse.json({ term, results });
  }

  return NextResponse.json({ msg: 'No term provided' });
}
