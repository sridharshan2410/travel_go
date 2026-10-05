import React, {
  createContext,
  useContext,
  useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] =
    useState(() => {
      return localStorage.getItem("isLoggedIn") === "true";
    });

  const [loggedUser, setLoggedUser] =
    useState(() => {
      return localStorage.getItem("loggedUser") || "";
    });


  // =========================
  // SIGNUP
  // =========================

  const signup = (userData) => {

    const existingUsers =
      JSON.parse(
        localStorage.getItem("travelUsers") || "[]"
      );

    const emailExists = existingUsers.some(
      (user) =>
        user.email.toLowerCase() ===
        userData.email.toLowerCase()
    );

    if (emailExists) {
      return {
        success: false,
        message: "Email already registered."
      };
    }

    existingUsers.push(userData);

    localStorage.setItem(
      "travelUsers",
      JSON.stringify(existingUsers)
    );

    return {
      success: true,
      message: "Account created successfully."
    };
  };


  // =========================
  // LOGIN
  // =========================

  const login = (username, password) => {

    const existingUsers =
      JSON.parse(
        localStorage.getItem("travelUsers") || "[]"
      );

    const user = existingUsers.find(
      (item) =>
        (
          item.email.toLowerCase() ===
          username.toLowerCase() ||
          item.name.toLowerCase() ===
          username.toLowerCase()
        ) &&
        item.password === password
    );

    if (!user) {
      return false;
    }

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "loggedUser",
      user.name
    );

    setIsAuthenticated(true);
    setLoggedUser(user.name);

    return true;
  };


  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedUser");

    setIsAuthenticated(false);
    setLoggedUser("");
  };


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loggedUser,
        signup,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}