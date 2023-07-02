import React, { useState, useEffect } from "react";
import nookies from "nookies";
import useAccountStore from "@/store/accountStore";

import {
  User,
  signOut,
  updateEmail,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { STATUS } from "@/const";
import useUiStore from "@/store/uiStore";
import { auth } from "../../../pages/api/firebase/config";
import { storage } from "../../../pages/api/firebase/config";
import { AuthContextType, UpdateUserInfoTypes } from "./types";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

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
  const closeReauthenticateModal = useUiStore(
    (state: any) => state.closeReauthenticateModal
  );
  const reauthenticateModalisOpen = useUiStore(
    (state: any) => state.reauthenticateModalisOpen
  );

  const [currentUser, setCurrentUser] = useState<Object | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        console.log(user);
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

    // change dependency to internal state instead of an external state
    // so that the hook won't rely on anything outside of it's scope 
  }, [isLoading]);

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
        setIsLoading(true);
        // call the built-in method in Firebase for signing in to trigger the onAuthStateChanged
        await signInWithEmailAndPassword(auth, username, password);

        // close re-auth modal if it's open on profile page
        if (reauthenticateModalisOpen) {
          closeReauthenticateModal();

          return {
            status: STATUS.SUCCESS,
            code: "reauthentication",
            message: "Reauthentication successful!",
          };
        }

        return {
          status: STATUS.SUCCESS,
          code: "login",
          message: "Login successful!",
        };
      } catch (err: any) {
        if (err.message.includes("wrong-password")) {
          return {
            status: STATUS.FAILED,
            code: "login",
            message: "Wrong password",
          };
        } else if (err.message.includes("too-many-requests")) {
          return {
            status: STATUS.FAILED,
            code: "login",
            message: "Account locked due to failed attempts",
          };
        }

        return {
          status: STATUS.FAILED,
          code: "login",
          message: "Login failed. Try again.",
        };
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      clearUser();

      return {
        status: STATUS.SUCCESS,
        code: "logout",
        message: "Log out successful. See you soon!",
      };
    } catch (err) {}
  }

  async function updateUserInfo(payload: UpdateUserInfoTypes) {
    const { displayName, username, photoUrl } = payload;

    try {
      setIsLoading(true);
      await updateProfile(auth.currentUser as User, {
        displayName: displayName,
        photoURL: photoUrl,
      });

      await updateEmail(auth.currentUser as User, username as string);

      const storageRef = ref(storage, `files/${photoUrl}`);
      const uploadTask = uploadBytesResumable(storageRef, photoUrl as any);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {});
        }
      );

      return {
        status: STATUS.SUCCESS,
        code: "account-info",
        message: "Account info updated!",
      };
    } catch (error: any) {
      if (error.message.includes("requires-recent-login")) {
        return {
          status: STATUS.FAILED,
          code: "account-info",
          message: "Requires recent login",
        };
      }
    } finally {
      setIsLoading(false);
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
