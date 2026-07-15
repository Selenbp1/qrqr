module.exports = (_req, res) => {
  const links = [
    {
      label: "B2B",
      href:
        process.env.LINK_B2B?.trim() ||
        "https://selenbp1.github.io/qrqr/b2b.pdf",
    },
    {
      label: "B2G",
      href:
        process.env.LINK_B2G?.trim() ||
        "https://selenbp1.github.io/qrqr/b2g.pdf",
    },
    {
      label: "B2C",
      href:
        process.env.LINK_B2C?.trim() ||
        "https://selenbp1.github.io/qrqr/b2c.pdf",
    },
  ];

  const buttons = links
    .map(
      (link) =>
        `<a class="btn" href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`
    )
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#0f2744" />
  <title>Solux 브로슈어</title>
  <style>
    :root {
      --bg: #0f2744;
      --bg-soft: #16355a;
      --text: #f4f7fb;
      --muted: #b7c5d8;
      --btn: #f0f4f8;
      --btn-text: #0f2744;
      --btn-hover: #ffffff;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; min-height: 100%; }
    body {
      font-family: "Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at top, #1d4470 0%, transparent 45%),
        linear-gradient(180deg, var(--bg) 0%, #0a1a2f 100%);
      color: var(--text);
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 20px;
    }
    .card {
      width: 100%;
      max-width: 420px;
      text-align: center;
    }
    .eyebrow {
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-size: 0.75rem;
      color: var(--muted);
      margin-bottom: 12px;
    }
    h1 {
      margin: 0 0 8px;
      font-size: clamp(1.6rem, 5vw, 2rem);
      font-weight: 700;
      line-height: 1.25;
    }
    p {
      margin: 0 0 28px;
      color: var(--muted);
      font-size: 0.98rem;
      line-height: 1.5;
    }
    .links {
      display: grid;
      gap: 12px;
    }
    .btn {
      display: block;
      padding: 18px 20px;
      border-radius: 14px;
      background: var(--btn);
      color: var(--btn-text);
      text-decoration: none;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .btn:active { transform: scale(0.98); }
    @media (hover: hover) {
      .btn:hover { background: var(--btn-hover); }
    }
  </style>
</head>
<body>
  <main class="card">
    <div class="eyebrow">SOLUX</div>
    <h1>브로슈어</h1>
    <p>원하시는 브로슈어를 선택해 주세요.</p>
    <div class="links">
      ${buttons}
    </div>
  </main>
</body>
</html>`;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  res.end(html);
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
