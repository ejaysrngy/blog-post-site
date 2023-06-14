import { NextApiRequest, NextApiResponse } from "next";

export interface RegisterRequestTypes extends NextApiRequest {
    body: {
        username: string
        password: string
    }
}

export interface RegisterResponseTypes extends NextApiResponse {}

export interface LoginRequestTypes extends NextApiRequest {
    body: {
        username: string
        password: string
    }
}

export interface LoginResponseTypes extends NextApiResponse {}