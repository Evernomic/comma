import { createCipheriv, createDecipheriv } from "crypto";

const AES_KEY = process.env.AES_KEY!;
const AES_IV = process.env.AES_IV!;

export function encrypt(input: string): string {
  const cipher = createCipheriv(
    "aes-256-cbc",
    Buffer.from(AES_KEY, "hex"),
    Buffer.from(AES_IV, "hex"),
  );
  let encrypted = cipher.update(input, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(input: string): string {
  const decipher = createDecipheriv(
    "aes-256-cbc",
    Buffer.from(AES_KEY, "hex"),
    Buffer.from(AES_IV, "hex"),
  );
  let decrypted = decipher.update(input, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
