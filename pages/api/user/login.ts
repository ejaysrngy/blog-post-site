import { LoginRequestTypes, LoginResponseTypes } from "./types";

async function handler(req: LoginRequestTypes, res: LoginResponseTypes) {
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

    res.status(200).json({
      message: "Sign in success!",
      success: true,
    });
    res.end();
  }
}

export default handler;
