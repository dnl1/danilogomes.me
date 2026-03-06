import { execFileSync } from "node:child_process";

const port = process.argv[2];

if (!port) {
  process.exit(0);
}

try {
  execFileSync("fuser", ["-k", `${port}/tcp`], {
    stdio: "ignore"
  });
} catch {
  // No process was using the port, or fuser could not terminate it.
}
