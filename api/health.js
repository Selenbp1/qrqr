export const config = { runtime: "edge" };

export default function handler() {
  const target =
    process.env.TARGET_URL?.trim() ||
    process.env.TARGET_URL_1?.trim() ||
    process.env.TARGET_URL_2?.trim() ||
    null;

  return new Response(
    JSON.stringify({ status: "ok", target }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
