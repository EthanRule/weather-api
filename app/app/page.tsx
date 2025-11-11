"use client";
import Image from "next/image";
import { useState } from "react";
// Fetch weather data from api endpoint, test.

export default function Home() {
  const [data, setData] = useState<any>("");
  const handleClick = async () => {
    try {
      const response = await fetch(`/api/get-weather-data`);
      if (!response.ok) {
        throw new Error(reponse.error);
      }
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className="bg-zinc-700 p-4 rounded border-2"
        onClick={handleClick}
      >
        Fetch Data
      </button>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
}
