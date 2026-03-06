import fs from "node:fs";
import path from "node:path";

const nextDir = path.join(process.cwd(), ".next");

if (!fs.existsSync(nextDir)) {
  process.exit(0);
}

const renamedDir = path.join(process.cwd(), `.next.stale.${Date.now()}`);

try {
  fs.renameSync(nextDir, renamedDir);
} catch {
  fs.rmSync(nextDir, {
    recursive: true,
    force: true,
    maxRetries: 10,
    retryDelay: 100
  });
  process.exit(0);
}

fs.rmSync(renamedDir, {
  recursive: true,
  force: true,
  maxRetries: 10,
  retryDelay: 100
});
