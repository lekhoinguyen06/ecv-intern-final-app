import { z } from 'zod';

export const UserObjectSchema = z
  .object({
    email: z.email(),
    name: z.string(),
    age: z.number(),
    sex: z.string(),
    description: z.string(),
    jobTitle: z.string(),
    studies: z.array(z.string()),
    interests: z.array(z.string()),
    notes: z.string(),
  })
  .partial()
  .required({ email: true });

export const CreateUserSchema = UserObjectSchema;
export const UpdateUserSchema = UserObjectSchema;

export type CreateUserDto = z.infer<typeof UserObjectSchema>;
export type UpdateUserDto = z.infer<typeof UserObjectSchema>;
