import { createClient } from "redis";

export async function connectRedis() {
  const client = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      url: process.env.REDISCLOUD_URL,
      port: 10038,
    },
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
  console.log("Connected to Redis Cloud");

  // Example
  await client.set("myKey", "Hello from Node.js");
  const value = await client.get("myKey");
  console.log(`Value of myKey: ${value}`);
  await client.quit();
}
