import { EditPostRequestTypes, EditPostResponseTypes } from "./types";

import { updateData } from "../firebase";

async function handler(req: EditPostRequestTypes, res: EditPostResponseTypes) {
  if (req.method === "PUT") {
    const { text, key, imageFile, title, excerpt } = req.body;

    if (!text) {
      res.status(422).json({ message: "Please fill out all of the fields" });

      return;
    }

    const reqBody = {
      title: title,
      content: text,
      excerpt: excerpt,
      image:
        "https://static.wikia.nocookie.net/rickandmorty/images/e/ee/Morty501.png/revision/latest?cb=20210827150137",
    };


    const { error } = await updateData("posts", key, reqBody);

    if (error) {
      console.log(error);
    }

    res.status(201).json({ message: "Success" });
  } else {
    return res.status(400).json({ message: "Invalid Request" });
  }
}

export default handler;
