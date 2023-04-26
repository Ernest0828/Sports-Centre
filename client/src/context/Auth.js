import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isManager: JSON.parse(localStorage.getItem("user"))?.isManager || false,
  loading: false,
  error: null,
};

export const Auth = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "SET_MANAGER":
      return {
        ...state,
        manager: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("manager", JSON.stringify(state.isManager));
  }, [state.user, state.isManager]);
  

  return (
    <Auth.Provider
      value={{
        user: state.user,
        isManager: state.isManager,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Auth.Provider>
  );
};