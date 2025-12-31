"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserSchema = exports.UpdateUserSchema = exports.CreateUserSchema = exports.UserObjectSchema = void 0;
const zod_1 = require("zod");
exports.UserObjectSchema = zod_1.z
    .object({
    email: zod_1.z.email(),
    name: zod_1.z.string(),
    age: zod_1.z.number(),
    sex: zod_1.z.string(),
    description: zod_1.z.string(),
    jobTitle: zod_1.z.string(),
    studies: zod_1.z.array(zod_1.z.string()),
    interests: zod_1.z.array(zod_1.z.string()),
    notes: zod_1.z.string(),
})
    .partial()
    .required({ email: true });
exports.CreateUserSchema = exports.UserObjectSchema;
exports.UpdateUserSchema = exports.UserObjectSchema;
exports.DeleteUserSchema = exports.UserObjectSchema;
//# sourceMappingURL=user.dto.js.map