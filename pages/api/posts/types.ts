import { NextApiRequest, NextApiResponse } from "next";

export interface CreatePostRequestTypes extends NextApiRequest {
  body: {
    uid: string;
    slug: string;
    text: string;
    title: string;
    excerpt: string;
    imageFile: string;
  };
}

export interface CreatePostResponseTypes extends NextApiResponse {
  message: string;
}
