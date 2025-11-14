import { NextResponse } from "next/server";
import { createClient } from "redis";
import { connectRedis } from "../../../lib/connectRedis.ts";

export async function GET(): Promise<NextResponse> {
  connectRedis();
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London%2CUK?unitGroup=us&key=${process.env.WEATHER_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return NextResponse.json(result, result.code);
  } catch (error) {
    return NextResponse.json(error);
  }
}
