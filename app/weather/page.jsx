"use client" 
import { useEffect, useState } from "react"; 
import { SearchBar } from "../components/searchBar"; 
import useGetData from "@/hooks/getDataWeatherByCity"; 
import { GetWeather } from "@/api/apiWeather"; 
import { getWeatherIcon } from "@/hooks/weatherIcons";
import { formatAirConditions, formatCurrent, formatTodayForecast, formatWeeklyForecast } from "@/hooks/formatData";

export default function Home() { 
  const [data, getData, isLoading, error] = useGetData() 
  const [conditions,setCondition] = useState()
  const [current,setCurrent] = useState()
  const [todayForecast,setTodayForecast] = useState()
  const [weeklyForecast, setWeeklyForecast] = useState([])
  const [icon,setIcon] = useState()
  
  const fetchWeather = () => { 
    getData(GetWeather, true, true,(res=>{ 
      console.log(res);
      
      setIcon(getWeatherIcon(res.current.condition.code))
      setCurrent(formatCurrent(res.current, res.location))
      setCondition(formatAirConditions(res.current,res.forecast.forecastday[0].day)) 
      setTodayForecast(formatTodayForecast(res.forecast.forecastday[0])) 
      setWeeklyForecast(formatWeeklyForecast(res.forecast.forecastday))
    })) 
  } 
  useEffect(() => { 
    fetchWeather() 
  },[]) 
  return (
    <div className="flex flex-col flex-1 gap-6">
  {/* Search bar */}
  <SearchBar onSearch={fetchWeather} isLoading={isLoading} />

  {isLoading ? (
    <div className="animate-pulse flex flex-col md:flex-row gap-6 flex-1">
          {/* Left skeleton */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-muted h-40"></div>
            <div className="p-6 rounded-2xl bg-muted h-32"></div>
            <div className="p-6 rounded-2xl bg-muted h-32"></div>
          </div>

          {/* Right skeleton */}
          <div className="w-full md:w-1/3 p-6 rounded-2xl bg-muted h-[400px]"></div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 flex-1">
          {/* Left content */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="p-6 rounded-2xl shadow bg-card">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-7">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {current.city}, {current.country}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Wind Speed: {current.wind}
                    </p>
                  </div>
                  <span className="text-6xl font-bold text-foreground">{current.temp}</span>
                </div>
                <img src={icon} alt={current.condition} width={100} className="md:w-[150px]" />
              </div>
            </div>

            {/* Today's Forecast */}
            <div className="bg-card p-6 rounded-2xl shadow">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Today's Forecast</h3>
              <div className="flex flex-wrap divide-x divide-border">
                {todayForecast.map((h, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center w-1/3 sm:w-1/4 md:w-1/6 py-2"
                  >
                    <span className="text-sm text-muted-foreground">{h.time}</span>
                    <img
                      src={getWeatherIcon(h.conditionCode)}
                      alt={h.conditionText}
                      width={40}
                    />
                    <span className="text-sm font-bold text-foreground">{h.temp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Air Conditions */}
            <div className="bg-card p-6 rounded-2xl shadow">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Today's Air Conditions</h3>
              <div className="grid grid-cols-2 gap-4">
                {conditions.map((c, idx) => (
                  <div key={idx}>
                    <p className="text-muted-foreground">{c.label}</p>
                    <p className="text-xl font-bold text-foreground">{c.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-full md:w-1/3 bg-card p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-4 text-foreground">7-Day Forecast</h3>
            <div className="flex flex-col gap-4">
              {weeklyForecast.map((f, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="text-muted-foreground w-1/3 flex justify-start">{f.day}</span>
                  <div className="w-1/3 flex gap-5">
                    <img src={f.icon} alt={f.day} width={30}/>
                    <span className="text-foreground">{f.conditionText}</span>
                  </div>
                  <span className="text-muted-foreground w-1/3 flex justify-end">{f.temp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}