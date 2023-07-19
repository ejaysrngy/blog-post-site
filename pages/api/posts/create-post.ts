import { CreatePostRequestTypes, CreatePostResponseTypes } from "./types";

import { addData } from "../firebase";

async function handler(
  req: CreatePostRequestTypes,
  res: CreatePostResponseTypes
) {
  if (req.method === "POST") {
    const { text, uid, imageFile, title, excerpt, slug } = req.body;

    if (!text) {
      res.status(422).json({ message: "Please fill out all of the fields" });

      return;
    }

    const date = new Date().toISOString();

    const keyAndId = crypto.randomUUID();

    const reqBody = {
      uid: uid,
      title: title,
      content: text,
      key: keyAndId,
      time_stamp: date,
      excerpt: excerpt,
      image:
        "https://static.wikia.nocookie.net/rickandmorty/images/e/ee/Morty501.png/revision/latest?cb=20210827150137",
      metadata: {
        date: date,
        slug: slug,
      },
    };

    const { error } = await addData("posts", keyAndId, reqBody);

    if (error) {
      console.log(error);
    }

    res.status(201).json({ message: "Success" });
  } else {
    return res.status(400).json({ message: "Invalid Request" });
  }
}

export default handler;
