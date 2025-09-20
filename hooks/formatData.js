import { getWeatherCategory, getWeatherIcon } from "./weatherIcons" 

export function formatWeeklyForecast(forecastdays) {
  if (!forecastdays || !Array.isArray(forecastdays)) return []

  return forecastdays.map((dayData, idx) => {
    const date = new Date(dayData.date)
    const options = { weekday: "short" } // Sun, Mon, Tue...
    const dayName = idx === 0 ? "Today" : date.toLocaleDateString("en-US", options)

    return {
      day: dayName,
      icon: getWeatherIcon(dayData.day.condition.code) ,
      conditionText: getWeatherCategory(dayData.day.condition.code),
      temp: `${dayData.day.avgtemp_c}°`
    }
  })
}

export function formatAirConditions(current,forecastDay) {
    return [
      {
        label: "Real Feel",
        value: `${current.feelslike_c}°`,
      },
      {
        label: "Wind",
        value: `${forecastDay.maxwind_kph} km/h`,
      },
      {
        label: "Chance of Rain",
        value: `${forecastDay.daily_chance_of_rain}%`,
      },
      {
        label: "Chance of Snow",
        value: `${forecastDay.daily_chance_of_snow}%`,
      },
      {
        label: "UV Index",
        value: forecastDay.uv,
      },
    ]
  }

  export function formatCurrent(current, location) {
    return {
      city: location?.name || "-",
      country: location?.country || "-",
      temp: `${current.temp_c}°`,
      wind: `${current.wind_kph} km/h`,
    }
  }

  export function formatTodayForecast(forecastDay, times = [6, 9, 12, 15, 18, 21]) {
    if (!forecastDay?.hour) return []
  
    return times.map((hour) => {
      const entry = forecastDay.hour.find(
        (h) => new Date(h.time).getHours() === hour
      )
  
      return {
        time: `${hour <= 12 ? hour : hour - 12}${hour < 12 ? "AM" : "PM"}`,
        temp: entry ? `${entry.temp_c}°` : "-",
        conditionCode: entry?.condition?.code,
        conditionText: entry?.condition?.text || "-",
      }
    })
  }