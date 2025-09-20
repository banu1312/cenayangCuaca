import apiWeather from "@/helper/apiWeatherConfig"

export async function GetWeather(city) {
  try {
    const res = await apiWeather.get("/forecast.json", {
      params: {
        q: city,
        days: 7,
        aqi: "yes",
        alerts: "yes",
      },
    })
    return res
  } catch (err) {
    console.error("Failed to fetch weather:", err)
    return null
  }
}