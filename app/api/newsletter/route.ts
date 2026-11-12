import { NextResponse } from "next/server";

// [LATER] Connect a newsletter tool (brief §8). For now sign-ups are validated and logged on the server only.
export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "").trim();
  const consent = form.get("consent");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !consent) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  console.info("[newsletter] sign-up (not yet sent to a mailing tool):", email);
  return NextResponse.json({ ok: true });
}
