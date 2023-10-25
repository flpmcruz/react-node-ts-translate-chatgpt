import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: Number(process.env.PORT) || 4000,
  CHATGPTKEY: process.env.CHATGPTKEY || "",
};

export const SUPORTED_LANGUAGES = {
  en: "English",
  es: "Spanish",
  de: "Deutsch",
};

export const AUTO_LANGUAGE = "auto";
