export const config = { runtime: "edge" };

export default function handler() {
  const target = process.env.TARGET_URL?.trim();

  if (!target) {
    return new Response(
      JSON.stringify({
        error: "TARGET_URL is not set. Add it in Vercel Environment Variables.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    new URL(target);
  } catch {
    return new Response(
      JSON.stringify({ error: "TARGET_URL is not a valid URL." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return Response.redirect(target, 302);
}
