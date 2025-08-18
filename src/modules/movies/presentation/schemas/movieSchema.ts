import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string(),
  image: z.string().optional(),
  genre: z.string(),
  userId: z.uuidv4(),
  classification: z.string(),
  platform: z.string(),
  showtime: z.coerce.date(),
  duration: z.coerce.number().int(),
  observation: z.string().optional(),
  watched: z.coerce.boolean(),
  rating: z.coerce.number().optional(),
});
