import { RegisterRequestTypes, RegisterResponseTypes } from "./types";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

async function handler(
  req: RegisterRequestTypes,
  res: RegisterResponseTypes
) {
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

    await createUserWithEmailAndPassword(auth, username, password);
    res.status(200).json({ message: "Sign up success!", success: true });
    res.end();
  }
}

export default handler;
