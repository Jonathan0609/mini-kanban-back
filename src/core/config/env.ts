import z from "zod/v4";

export const envSchema = z.object({
	DATABASE_URL: z.url(),
	PORT: z.coerce.number().optional().default(3333),
});

export type Env = z.infer<typeof envSchema>;
