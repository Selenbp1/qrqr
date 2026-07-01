export const config = { runtime: "edge" };

function redirect(envKey) {
  const target = process.env[envKey]?.trim();

  if (!target) {
    return new Response(
      JSON.stringify({
        error: `${envKey} is not set. Add it in Vercel Environment Variables.`,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    new URL(target);
  } catch {
    return new Response(
      JSON.stringify({ error: `${envKey} is not a valid URL.` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return Response.redirect(target, 302);
}

export default function handler() {
  return redirect("TARGET_URL_1");
}
