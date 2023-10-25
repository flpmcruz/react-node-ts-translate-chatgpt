import { useReducer } from "react";
import type { Action, FromLanguage, Language, State } from "../types";
import { AUTO_LANGUAGE } from "../constants";

const initState: State = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
};

function reducer(state: State, action: Action) {
  const { type } = action;

  if (type === "INTERCHANGE_LANGUAGE") {
    if (state.fromLanguage === AUTO_LANGUAGE) return state;
    const loading = state.fromText !== "";
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      result: "",
      loading,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    if (state.fromLanguage === action.payload) return state;
    const loading = state.fromText !== "";
    return {
      ...state,
      fromLanguage: action.payload,
      result: "",
      loading,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    if (state.toLanguage === action.payload) return state;
    const loading = state.fromText !== "";
    return {
      ...state,
      toLanguage: action.payload,
      result: "",
      loading,
    };
  }

  if (type === "SET_FROM_TEXT") {
    const loading = action.payload !== "";
    return {
      ...state,
      loading,
      fromText: action.payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}

export function useStore() {
  const [state, dispatch] = useReducer(reducer, initState);

  const interchangeLanguage = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGE" });
  };
  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };
  const setToLanguage = (payload: Language) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };
  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };
  const setResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload });
  };

  return {
    ...state,

    // Actions
    interchangeLanguage,
    setFromLanguage,
    setFromText,
    setResult,
    setToLanguage,
  };
}
