import axios from "axios"

// Bikin instance axios
const apiWeather = axios.create({
  baseURL: "https://api.weatherapi.com/v1", // ganti sesuai base URL API
  timeout: 10000,
  params: {
    key: process.env.NEXT_PUBLIC_WEATHER_API_KEY, // taruh API key di .env
  },
})

// Request interceptor (optional: log atau modifikasi request)
apiWeather.interceptors.request.use(
  (config) => {
    // console.log("Request:", config.url, config.params)
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor (optional: handle error global)
apiWeather.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default apiWeather
