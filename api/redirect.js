export const config = { runtime: "edge" };

function getTarget(envKey) {
  const target = process.env[envKey]?.trim();
  if (!target) return null;
  try {
    new URL(target);
    return target;
  } catch {
    return null;
  }
}

export default function handler(request) {
  const n = new URL(request.url).searchParams.get("n") || "1";
  const envKey = `TARGET_URL_${n}`;
  const target = getTarget(envKey);

  if (!target) {
    return new Response(
      JSON.stringify({
        error: `${envKey} is not set or invalid. Add it in Vercel Environment Variables.`,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return Response.redirect(target, 302);
}
