import { picklist, type InferOutput } from 'valibot';

export const CategorySchema = picklist(['dev', 'tool', 'media']);
export type Category = InferOutput<typeof CategorySchema>;

// Folder は canvas で色を解決するため CSS 変数が使えない。Moon の foam/iris/rose を overlay (#393552) と 6:4 で混ぜた hex
export const categoryColors: Record<Category, string> = {
  dev: '#7491a2',
  tool: '#8c79ab',
  media: '#a3727b',
};
