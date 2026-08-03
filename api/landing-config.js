function getConfig() {
  const mode = (process.env.LANDING_MODE || "brochure").trim().toLowerCase();

  if (mode === "soq" || mode === "introduction") {
    return {
      title: process.env.LANDING_TITLE?.trim() || "Solux",
      heading: process.env.LANDING_HEADING?.trim() || "자료 선택",
      subtitle:
        process.env.LANDING_SUBTITLE?.trim() ||
        "원하시는 자료를 선택해 주세요.",
      links: [
        {
          label: process.env.LINK_1_LABEL?.trim() || "회사소개서",
          href:
            process.env.LINK_1_URL?.trim() ||
            process.env.LINK_INTRODUCTION?.trim() ||
            "https://selenbp1.github.io/qrqr/introduction_%20250311.pdf",
        },
        {
          label: process.env.LINK_2_LABEL?.trim() || "지명원",
          href:
            process.env.LINK_2_URL?.trim() ||
            process.env.LINK_SOQ?.trim() ||
            "https://selenbp1.github.io/qrqr/soq.pdf",
        },
      ],
    };
  }

  return {
    title: process.env.LANDING_TITLE?.trim() || "Solux 브로슈어",
    heading: process.env.LANDING_HEADING?.trim() || "브로슈어",
    subtitle:
      process.env.LANDING_SUBTITLE?.trim() ||
      "원하시는 브로슈어를 선택해 주세요.",
    links: [
      {
        label: process.env.LINK_1_LABEL?.trim() || "B2B",
        href:
          process.env.LINK_1_URL?.trim() ||
          process.env.LINK_B2B?.trim() ||
          "https://selenbp1.github.io/qrqr/b2b.pdf",
      },
      {
        label: process.env.LINK_2_LABEL?.trim() || "B2G",
        href:
          process.env.LINK_2_URL?.trim() ||
          process.env.LINK_B2G?.trim() ||
          "https://selenbp1.github.io/qrqr/b2g.pdf",
      },
      {
        label: process.env.LINK_3_LABEL?.trim() || "B2C",
        href:
          process.env.LINK_3_URL?.trim() ||
          process.env.LINK_B2C?.trim() ||
          "https://selenbp1.github.io/qrqr/b2c.pdf",
      },
    ],
  };
}

module.exports = { getConfig };
