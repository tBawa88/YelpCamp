import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(3, "Username must be more greater than 3 characters")
    .max(20, "User name must be under 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username can only contain alpha-numeric characters");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid Email address" }),
    password: z.string().min(6, { message: "Password must be of atleast 6 characters" })
})
//This will be used to validate the data entered during the signup process