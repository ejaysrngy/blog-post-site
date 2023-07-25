import { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    let posts = [] as Array<any>;

    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      posts = [{ ...doc.data() }, ...posts];
    });

    console.log(posts);

    res.status(201).json(posts);
  } else {
    return res.status(400).json({ message: "Invalid Request" });
  }
}

export default handler;
