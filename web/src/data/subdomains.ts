import { array, object, parse, string, type InferOutput } from 'valibot';

import { CategorySchema } from './categories';
import subdomainsJson from './subdomains.json';

const SubdomainSchema = object({
  id: string(),
  name: string(),
  url: string(),
  category: CategorySchema,
  screenshot: string(),
});

export type Subdomain = InferOutput<typeof SubdomainSchema>;

export const subdomains = parse(array(SubdomainSchema), subdomainsJson);
