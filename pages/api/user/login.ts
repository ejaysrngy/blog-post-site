import { LoginRequestTypes, LoginResponseTypes } from "./types";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

async function handler(req: LoginRequestTypes, res: LoginResponseTypes) {
  const auth = getAuth();

  if (req.method === "POST") {
    const { username, password } = req.body;

    if (
      !username || // if username/email is empty
      username.trim() === "" || // if username/email has whitespace
      !password || // if password is empty
      password.trim() === "" || // if password has whitespace
      password.length < 6
    ) {
      res
        .status(422)
        .json({ message: "Please fill out all of the fields properly" });
      res.end();
      return;
    }

    const response = await signInWithEmailAndPassword(auth, username, password);
    const accessToken = await response.user.getIdToken();

    // *onAuthStateChanged only works when it exists along with signInWithEmailAndPassword
    // onAuthStateChanged(auth, (user: any) => {
    //   console.log("ON AUTH CHANGE", user);
    // });

    res.status(200).json({
      message: "Sign up success!",
      success: true,
      access_token: accessToken,
    });
    res.end();
  }
}

export default handler;
