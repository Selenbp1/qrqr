export const config = { runtime: "edge" };

export default function handler() {
  const targets = {
    target1: process.env.TARGET_URL_1?.trim() || null,
    target2: process.env.TARGET_URL_2?.trim() || null,
  };

  return new Response(JSON.stringify({ status: "ok", ...targets }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
