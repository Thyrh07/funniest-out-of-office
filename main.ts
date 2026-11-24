// The Funniest Out-of-Office — make.fun entry (program/v1)
// Writes one line of an out-of-office auto-reply to /output/entry.txt.
// Gate: UTF-8 text, 1-140 characters, a single line, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT = "I'm out until Monday. My inbox has unionised in my absence and will only answer emails it finds emotionally fulfilling.";

// Enforce the sealed gate before writing: 1-140 characters, exactly one
// line, not only whitespace, and no trailing newline (the gate counts the
// newline, and a second line would fail it).
function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 140) throw new Error(`entry is ${chars} chars, gate needs 1-140`);
  if (text.trim().length === 0) throw new Error("entry is only whitespace");
  if (text.includes("\n") || text.includes("\r")) throw new Error("entry must be a single line");
  if (text !== text.trim()) throw new Error("entry has leading or trailing whitespace");
}

validate(OUTPUT);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", OUTPUT, "utf8");
