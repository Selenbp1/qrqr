export const config = { runtime: "edge" };

export default function handler() {
  const target = process.env.TARGET_URL?.trim() || null;

  return new Response(
    JSON.stringify({ status: "ok", target }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
