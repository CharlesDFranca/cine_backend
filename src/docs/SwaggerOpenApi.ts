import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";

export class SwaggerOpenApi {
  private constructor() {}

  static buildOpenAPIDocument() {
    const globalRegistry = new OpenAPIRegistry([]);

    const generator = new OpenApiGeneratorV3(globalRegistry.definitions);

    return generator.generateDocument({
      openapi: "3.0.3",
      info: {
        title: "Cine API",
        version: "1.0.0",
      },
    });
  }
}
