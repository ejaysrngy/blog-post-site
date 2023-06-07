import {
  ContactHandlerRequestTypes,
  ContactHandlerResponseTypes,
} from "./types";

import { addData } from "@/firebase";

async function handler(
  req: ContactHandlerRequestTypes,
  res: ContactHandlerResponseTypes
) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Please fill out all of the fields" });

      return;
    }

    const date = new Date().toUTCString().substring(0, 25);

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
