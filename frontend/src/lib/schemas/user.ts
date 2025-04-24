import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "password length atleast 8 characters."),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "password length atleast 8 characters."),
});

export const userProfileSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(2, { message: "Username must be at least 2 characters" }),
  avatar: z.any().refine((file) => file?.length === 1, "Image is required"),
  bio: z
    .string()
    .max(160, { message: "Bio must be under 160 characters" })
    .optional(),
});
