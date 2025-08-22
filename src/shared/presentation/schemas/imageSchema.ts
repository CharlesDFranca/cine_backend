import z from "zod";

export const imageSchema = z
  .object({
    originalname: z.string(),
    mimetype: z.string().refine((type) => type.startsWith("image/"), {
      message: "O arquivo precisa ser uma imagem",
    }),
    size: z.number().max(10 * 1024 * 1024, "Máx. 5MB"),
    buffer: z.instanceof(Buffer)
  })
  .optional();
