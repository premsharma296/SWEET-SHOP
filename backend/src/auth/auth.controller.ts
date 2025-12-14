import { Request, Response } from "express";
import { createUser, authenticate } from "./auth.service";

export async function register(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const token = await authenticate(req.body);
    res.status(200).json({ token });
  } catch {
    res.status(401).json({ message: "Invalid email or password" });
  }
}
