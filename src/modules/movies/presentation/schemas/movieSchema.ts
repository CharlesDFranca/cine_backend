import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);
export const createMovieSchema = z.object({
  title: z
    .string()
    .openapi("Movie Title", { example: "Como Treinar Seu Dragâo" }),
  genre: z.string().openapi("Movie Genre", { example: "Animação" }),
  userId: z.uuidv4().openapi("Movie User Id", {
    example: "960bb9ae-1700-46aa-9c20-de4866a15653",
  }),
  classification: z.string().openapi("Movie Classification", { example: "L" }),
  platform: z.string().openapi("Movie Platform", { example: "Prime Video" }),
  showtime: z.coerce
    .date()
    .openapi("Movie Showtime", { example: "2025-09-18T20:30:00Z" }),
  duration: z.coerce.number().int().openapi("Movie Duration", { example: 98 }),
  observation: z
    .string()
    .optional()
    .openapi("Movie Observation", { example: "Filme muito bom, meu favorito" }),
  watched: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .openapi("Movie Watched", { example: true }),
  rating: z.coerce
    .number()
    .optional()
    .openapi("Movie Rating", { example: 10.0 }),
});

export const findMovieByTitleSchema = z.object({
  title: z.string().openapi("Movie Ttile", { example: "Vingadores" }),
});

export const findMovieByIdSchema = z.object({
  movieId: z
    .uuidv4()
    .openapi("Movie Id", { example: "e50b165d-12ae-467f-9276-7ce55373208f" }),
});

export const updateMovieSchema = z.object({
  title: z
    .string()
    .optional()
    .openapi("Movie Title", { example: "Como Treinar Seu Dragâo" }),
  genre: z.string().optional().openapi("Movie Genre", { example: "Animação" }),
  classification: z
    .string()
    .optional()
    .openapi("Movie Classification", { example: "L" }),
  platform: z
    .string()
    .optional()
    .openapi("Movie Platform", { example: "Prime Video" }),
  showtime: z.coerce
    .date()
    .optional()
    .openapi("Movie Showtime", { example: "2025-09-18T20:30:00Z" }),
  duration: z.coerce
    .number()
    .int()
    .optional()
    .openapi("Movie Duration", { example: 98 }),
  observation: z
    .string()
    .optional()
    .openapi("Movie Observation", { example: "Filme muito bom, meu favorito" }),
  watched: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .optional()
    .openapi("Movie Watched", { example: true }),
  rating: z.coerce
    .number()
    .optional()
    .openapi("Movie Rating", { example: 10.0 }),
  movieId: z
    .uuidv4()
    .openapi("Movie Id", { example: "ee520234-e71e-4f8e-b32c-99d8e2eaaff9" }),
});
