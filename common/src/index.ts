import { z } from "zod";
export const signupInput = z.object({
  username: z.string(),
  password: z.string().min(5),
});
export type signInputParams = z.infer<typeof signupInput>;
