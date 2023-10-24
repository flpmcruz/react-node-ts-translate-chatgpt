import { AUTO_LANGUAGE, SUPORTED_LANGUAGES } from "./constants";
export type Language = keyof typeof SUPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type FromLanguage = Language | AutoLanguage;

export interface State {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  result: string;
  loading: boolean;
}

export type Action =
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string }
  | { type: "SET_FROM_LANGUAGE"; payload: FromLanguage }
  | { type: "SET_TO_LANGUAGE"; payload: Language }
  | { type: "INTERCHANGE_LANGUAGE"; payload?: string };

export enum SectionTypes {
  From = "from",
  To = "to",
}
