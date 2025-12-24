import { PipeTransform } from '@nestjs/common';
import * as z from 'zod';
export declare class ZodValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: z.ZodType);
    transform(value: unknown): unknown;
}
