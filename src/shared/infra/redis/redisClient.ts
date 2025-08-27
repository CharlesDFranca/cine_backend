import { envConfig } from "@/config/env/EnvConfig";
import { createClient } from "redis";

export const redisClient = createClient({
  username: envConfig.getRedisUser(),
  password: envConfig.getRedisPassword(),
  socket: {
    host: envConfig.getRedisHost(),
    port: envConfig.getRedisPort(),
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient.connect().then(() => console.log("CONECTADO AO REDIS"));
