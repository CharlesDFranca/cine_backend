import "reflect-metadata";

import { envConfig } from "./config/env/EnvConfig";
import express from "express";
import swaggerUi from "swagger-ui-express";

import "@/shared/infra/di/container";
import "@/shared/infra/database/TypeormClient";
import { SwaggerOpenApi } from "./docs/SwaggerOpenApi";

const app = express();

app.use(express.json());

const PORT = envConfig.getPort();

const openapi = SwaggerOpenApi.buildOpenAPIDocument();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.listen(PORT, () => console.log(`App rodando na porta: ${PORT}`));
