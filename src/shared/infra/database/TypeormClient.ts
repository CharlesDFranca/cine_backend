import { envConfig } from "@/config/env/EnvConfig";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: envConfig.getDbUrl(),
  entities: [],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => console.log("Conectado do postgres via typeorm"))
  .catch((err) => console.error(`Erro na conexão com o postgres\n${err}`));
