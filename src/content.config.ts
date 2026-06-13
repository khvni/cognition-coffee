import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Blog ("Field Notes") collection — Content Layer API (Astro 5+/6).
 * Posts live in src/content/blog/*.mdx and render through layouts/BlogPost.astro.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string().default("Field Notes"),
    /** order on the index, lower = first */
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
