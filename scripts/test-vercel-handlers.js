process.env.TARGET_URL = process.env.TARGET_URL || "http://www.solux.co.kr/kor/";

function getTargetUrl() {
  const target = process.env.TARGET_URL?.trim();
  if (!target) return null;
  try {
    new URL(target);
    return target;
  } catch {
    return null;
  }
}

const target = getTargetUrl();
console.log("TARGET_URL check:", target || "INVALID");

if (target) {
  console.log("Expected redirect: 302 ->", target);
} else {
  process.exit(1);
}
