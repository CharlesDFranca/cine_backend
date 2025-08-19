import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);
export const createMovieSchema = z.object({
  title: z
    .string()
    .openapi("Movie Title", { example: "Como Treinar Seu Dragâo" }),
  image: z
    .string()
    .optional()
    .openapi("Movie Image", { example: "ImageURL.jpg" }),
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
  watched: z.coerce.boolean().openapi("Movie Watched", { example: true }),
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
