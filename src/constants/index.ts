// Generate require("crypto").randomBytes(64).toString("hex")
import { string } from "joi";

export const JWT_SECRET = process.env.JWT_SECRET as string;

export const CLIENT_URL = process.env.CLIENT_URL;
 export const INFORMER_API = process.env.INFORMER_API as string;

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";