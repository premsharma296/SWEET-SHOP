import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "USER",
    },
  });

  // ❌ NEVER return password hash
  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}

export async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || "dev-secret",
    { expiresIn: "1h" }
  );
}
