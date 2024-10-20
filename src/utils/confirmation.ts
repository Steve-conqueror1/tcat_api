import crypto, { Cipher } from "crypto";

const algorithm = process.env.CRYPTO_ALGORITHM as string;
const secretKey = process.env.CONFIRMATION_SECRET_KEY as string;
const iv = process.env.INTIALIZATION_VECTOR as string;

export const encrypt = (token: string) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );

  const encrypted = Buffer.concat([cipher.update(token), cipher.final()]);
  return encrypted.toString("hex");
};

export const decrypt = (hash: string) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString();
};
