import { picklist, type InferOutput } from 'valibot';

export const CategorySchema = picklist(['dev', 'tool', 'media']);
export type Category = InferOutput<typeof CategorySchema>;
