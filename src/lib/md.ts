import * as fs from "node:fs";
import * as path from "node:path";

export function readMarkdownFile(fileName: string) {
  const filePath = path.join(process.cwd(), "public", "_static", fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  return fs.readFileSync(filePath, "utf-8");
}
