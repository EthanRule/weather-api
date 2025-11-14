import { NextResponse } from "next/server";
import { RedisClientProvider } from "../../../lib/RedisClientProvider";

const DEFAULT_EXPIRATION = 60;
const redis = await RedisClientProvider.getRedisClient();

export async function GET(): Promise<NextResponse> {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London%2CUK?unitGroup=us&key=${process.env.WEATHER_API_KEY}`;
  try {
    const redisData = await redis.get("weather");
    if (redisData != null) {
      console.log(`here`);
      return NextResponse.json(JSON.parse(redisData));
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    await redis.setEx("weather", DEFAULT_EXPIRATION, JSON.stringify(result));
    return NextResponse.json(result, result.code);
  } catch (error) {
    return NextResponse.json(error);
  }
}
