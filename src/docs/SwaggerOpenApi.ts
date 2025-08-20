import { authRegistry } from "@/modules/auth/presentation/docs/authRegistry";
import { movieRegistry } from "@/modules/movies/presentation/docs/movieRegistry";
import { userRegistry } from "@/modules/users/presentation/docs/userRegistry";
import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";

export class SwaggerOpenApi {
  private constructor() {}

  static buildApiDocument() {
    const globalRegistry = new OpenAPIRegistry([
      userRegistry,
      movieRegistry,
      authRegistry,
    ]);

    const generator = new OpenApiGeneratorV3(globalRegistry.definitions);

    return generator.generateDocument({
      openapi: "3.0.0",
      info: {
        title: "Habit Quest",
        version: "1.0.0",
      },
    });
  }
}
