import { envConfig } from "./config/env/EnvConfig";
import express from "express";

import "@/shared/infra/database/TypeormClient";

const app = express();

const PORT = envConfig.getPort();

app.listen(PORT, () => console.log(`App rodando na porta: ${PORT}`));
