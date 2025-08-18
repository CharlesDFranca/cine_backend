import "reflect-metadata";

import { envConfig } from "./config/env/EnvConfig";
import express from "express";

import "@/shared/infra/di/container";
import "@/shared/infra/database/TypeormClient";

import { userRoutes } from "./modules/users/presentation/http/routes/userRoutes";

const app = express();

app.use(express.json());

const PORT = envConfig.getPort();

app.use("/users", userRoutes);

app.listen(PORT, () => console.log(`App rodando na porta: ${PORT}`));
