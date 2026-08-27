//create your login form schema validations using zod
import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});
