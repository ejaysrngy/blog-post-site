import React, { useState, useEffect } from "react";

import { usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../pages/api/firebase/config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

type AuthContextType = {
  currentUser: any;
  logout: () => void;
  login: (username: string, password: string) => Promise<void> | null;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuthContext = () =>
  React.useContext(AuthContext) as AuthContextType;

// ACTUAL COMPONENT
export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);
      console.log("Auth state changed");
    });
    return unsub;
  }, [pathname]);

  async function login(username: string, password: string) {
    // call API regardless to pass it through the validation
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // if request went through
    if (response.ok) {
      // call the built-in method in Firebase for signing in to trigger the onAuthStateChanged
      const signInResponse = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      const accessToken = await signInResponse.user.getIdToken();

      // store accessToken in local storage
      localStorage.setItem("accessToken", accessToken);
    }

    return;
  }

  function logout() {
    return signOut(auth);
  }

  console.log(currentUser);

  return (
    <AuthContext.Provider value={{ login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
