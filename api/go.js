export const config = { runtime: "edge" };

function getTarget() {
  const target =
    process.env.TARGET_URL?.trim() ||
    process.env.TARGET_URL_1?.trim() ||
    process.env.TARGET_URL_2?.trim();

  if (!target) return null;

  try {
    new URL(target);
    return target;
  } catch {
    return null;
  }
}

export default function handler() {
  const target = getTarget();

  if (!target) {
    return new Response(
      JSON.stringify({
        error: "TARGET_URL is not set. Add it in Vercel Environment Variables.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return Response.redirect(target, 302);
}
