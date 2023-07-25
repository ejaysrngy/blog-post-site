import {
  ContactHandlerRequestTypes,
  ContactHandlerResponseTypes,
} from "./types";

import { addData } from "../../../firebase";

async function handler(
  req: ContactHandlerRequestTypes,
  res: ContactHandlerResponseTypes
) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email || // if email is empty
      !email.includes("@") || // email does not include @
      !name || // if name is empty/null
      name.trim() === "" || // if name has whitespaces
      !message // if message portion is empty
    ) {
      res.status(422).json({ message: "Please fill out all of the fields" });

      return;
    }

    const date = new Date().toISOString();

    const reqBody = {
      time_stamp: date,
      ...req.body,
    };

    const { error } = await addData("messages", crypto.randomUUID(), reqBody);

    if (error) {
      console.log(error);
    }

    res.status(201).json({ message: "Success" });
  }
}

export default handler;
