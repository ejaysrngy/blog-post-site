import React, { useState, useEffect } from "react";
import nookies from "nookies";
import useAccountStore from "@/store/accountStore";

import { STATUS } from "@/const";
import { auth } from "../../../pages/api/firebase/config";
import { AuthContextType, UpdateUserInfoTypes } from "./types";
import {
  User,
  signOut,
  updateEmail,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuthContext = () =>
  React.useContext(AuthContext) as AuthContextType;

// ACTUAL COMPONENT
export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const setUser = useAccountStore((state: any) => state.setUser);
  const clearUser = useAccountStore((state: any) => state.clearUser);

  const [currentUser, setCurrentUser] = useState<Object | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        const { accessToken, email, displayName } = user;

        setCurrentUser(user);
        setUser({
          email: email,
          username: displayName,
          accessToken: accessToken,
        });

        // store in token ID in cookies
        nookies.set(undefined, "token", user.stsTokenManager.accessToken, {
          path: "/",
        });
      } else {
        setCurrentUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      }
      console.log("Auth state changed");
    });
    return unsub;
  }, []);

  useEffect(() => {
    // set isLoading to true if currentUser is still undefined
    if (currentUser) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [currentUser]);

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
      try {
        // call the built-in method in Firebase for signing in to trigger the onAuthStateChanged
        await signInWithEmailAndPassword(auth, username, password);

        return {
          status: STATUS.SUCCESS,
          message: "Login successful!",
        };
      } catch (err: any) {
        if (err.message.includes("wrong-password")) {
          return {
            status: STATUS.FAILED,
            message: "Wrong password",
          };
        } else if (err.message.includes("too-many-requests")) {
          return {
            status: STATUS.FAILED,
            message: "Account locked due to failed attempts",
          };
        }

        return {
          status: STATUS.FAILED,
          message: "Login failed. Try again.",
        };
      }
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      clearUser();

      return {
        status: STATUS.SUCCESS,
        message: "Log out successful. See you soon!",
      };
    } catch (err) {}
  }

  async function updateUserInfo(payload: UpdateUserInfoTypes) {
    const { displayName, username, photoUrl } = payload;

    try {
      await updateProfile(auth.currentUser as User, {
        displayName: displayName,
        photoURL: photoUrl,
      });

      await updateEmail(auth.currentUser as User, username as string);

      return {
        status: STATUS.SUCCESS,
        message: "Account info updated!",
      };
    } catch (error: any) {
      if (error.message.includes("requires-recent-login")) {
        return {
          status: STATUS.FAILED,
          message: "Requires recent login",
        };
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, currentUser, isLoading, updateUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
