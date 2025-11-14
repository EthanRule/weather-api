import { createClient, RedisClientType } from "redis";

// Singleton class to create the redis client connection.
export class RedisClientProvider {
  private static instance: RedisClientType | null = null;

  private constructor() {}

  public static async getRedisClient(): Promise<RedisClientType> {
    if (!this.instance) {
      this.instance = createClient();
      await this.instance.connect();
      return this.instance;
    }
    return this.instance;
  }
}
