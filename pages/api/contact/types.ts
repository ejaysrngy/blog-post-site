import { NextApiRequest, NextApiResponse } from "next";

export interface ContactHandlerRequestTypes extends NextApiRequest {
    body: {
        email: String
        name: String
        message: String
    }
}

export interface ContactHandlerResponseTypes extends NextApiResponse {}