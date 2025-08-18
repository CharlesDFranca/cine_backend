import "reflect-metadata";

import { envConfig } from "./config/env/EnvConfig";
import express from "express";
import swaggerUi from "swagger-ui-express";

import "@/shared/infra/di/container";
import "@/shared/infra/database/TypeormClient";
import { SwaggerOpenApi } from "./docs/SwaggerOpenApi";

import { userRoutes } from "./modules/users/presentation/http/routes/userRoutes";
import { movieRoutes } from "./modules/movies/presentation/http/routes/movieRoutes";

const app = express();

app.use(express.json());

const PORT = envConfig.getPort();

const openApiSpec = SwaggerOpenApi.buildApiDocument();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

app.listen(PORT, () => console.log(`App rodando na porta: ${PORT}`));
