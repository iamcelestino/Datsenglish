import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
	loader: file("src/data/services.json"),
	schema: z.object({
		id: z.string(),
	    tier: z.enum(['beginner', 'intermediate', 'advanced']),
	    tierLabel: z.string(),
	    title: z.string(),
	    description: z.string(),
	    features: z.array(z.string()),
	    price: z.object({
			amount: z.number(),
			currency: z.string(),
			unit: z.string(),
	    }),
	    cta: z.string(),
	    popular: z.boolean(),
	}),
})

const steps = defineCollection({
	loader: file("src/data/steps.json"),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
	}),
})


export const collections  = { services, steps, blog };