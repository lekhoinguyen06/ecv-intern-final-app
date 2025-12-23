import { z } from 'zod';
declare const UserObjectSchema: z.ZodObject<{
    email: z.ZodNonOptional<z.ZodOptional<z.ZodEmail>>;
    name: z.ZodOptional<z.ZodString>;
    age: z.ZodOptional<z.ZodNumber>;
    sex: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    jobTitle: z.ZodOptional<z.ZodString>;
    studies: z.ZodOptional<z.ZodArray<z.ZodString>>;
    interests: z.ZodOptional<z.ZodArray<z.ZodString>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const CreateUserSchema: z.ZodObject<{
    email: z.ZodNonOptional<z.ZodOptional<z.ZodEmail>>;
    name: z.ZodOptional<z.ZodString>;
    age: z.ZodOptional<z.ZodNumber>;
    sex: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    jobTitle: z.ZodOptional<z.ZodString>;
    studies: z.ZodOptional<z.ZodArray<z.ZodString>>;
    interests: z.ZodOptional<z.ZodArray<z.ZodString>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const UpdateUserSchema: z.ZodObject<{
    email: z.ZodNonOptional<z.ZodOptional<z.ZodEmail>>;
    name: z.ZodOptional<z.ZodString>;
    age: z.ZodOptional<z.ZodNumber>;
    sex: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    jobTitle: z.ZodOptional<z.ZodString>;
    studies: z.ZodOptional<z.ZodArray<z.ZodString>>;
    interests: z.ZodOptional<z.ZodArray<z.ZodString>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateUserDto = z.infer<typeof UserObjectSchema>;
export type UpdateUserDto = z.infer<typeof UserObjectSchema>;
export {};
