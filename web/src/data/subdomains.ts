import { array, object, parse, pipe, string, transform, type InferOutput } from 'valibot';

import { CategorySchema } from './categories';
import subdomainsJson from './subdomains.json';

const SubdomainSchema = pipe(
  object({
    id: string(),
    name: string(),
    url: string(),
    category: CategorySchema,
  }),
  transform((s) => ({ ...s, screenshot: `/screenshots/${s.id}.jpg` })),
);

export type Subdomain = InferOutput<typeof SubdomainSchema>;

export const subdomains = parse(array(SubdomainSchema), subdomainsJson);
