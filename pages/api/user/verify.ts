import { NextApiRequest, NextApiResponse } from "next";

import { firebaseAdmin } from "../firebase/admin";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { userToken } = req.query;

    try {
      await firebaseAdmin.auth().verifyIdToken(userToken as string);

      res.status(200).json({ success: true, message: "User fetched" });
    } catch (e) {
      res.status(400).json({ message: e });
      res.end();
    }
  }
}

export default handler;
