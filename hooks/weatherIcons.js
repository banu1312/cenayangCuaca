const weatherMap = {
  sunny: "/sun.svg",
  cloudy: "/cloud.svg",
  rain: "/cloud_with_rain.svg",
  snow: "/snowflake.svg",
  thunder: "/cloud_with_lightning_and_rain.svg",
  fog: "/foggy.svg",
}

const groups = {
  sunny: [1000],
  cloudy: [1003, 1006, 1009],
  fog: [1030, 1135, 1147],
  rain: [
    1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195,
    1240, 1243, 1246,
  ],
  snow: [
    1066, 1069, 1114, 1117, 1210, 1213, 1216, 1219,
    1222, 1225, 1255, 1258,
  ],
  thunder: [1087, 1273, 1276, 1279, 1282],
}

// return kategori weather (sunny, cloudy, rain, ...)
export function getWeatherCategory(code) {
  for (const [category, codes] of Object.entries(groups)) {
    if (codes.includes(code)) {
      return category
    }
  }
  return "sunny"
}

export function getWeatherIcon(code) {
  const category = getWeatherCategory(code)
  return weatherMap[category]
}
