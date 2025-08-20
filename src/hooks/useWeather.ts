import { useMemo, useState } from "react";
import type { SearchType } from "../types"
// import { object, string, number, parse } from "valibot"
// import type { InferOutput } from "valibot"
import { z } from "zod"; // No es modular es decir se importa todo el contenido de una.

// TYPE GUARD OR ASSERTION
// function isWeather(weather: unknown) : weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_max === "number" &&
//     typeof (weather as Weather).main.temp_min === "number"
//   )
// }

// Zod
const WeatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  })
})
export type Weather = z.infer<typeof WeatherSchema>

// Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   })
// })
// type Weather = InferOutput<typeof WeatherSchema>

const initialWeather = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  }
}

export default function useWeather() {
  
  const [weather, setWeather] = useState<Weather>(initialWeather)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const hasWeatherData = useMemo(()=>weather.name,[weather])


  const fetchWeather = async (search: SearchType) => {
    const API_KEY = import.meta.env.VITE_API_KEY
    setLoading(true)
    setWeather(initialWeather)
    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${API_KEY}`
      await fetch(geoUrl)
        .then(res => {
          if (!res.ok) throw new Error("HTTP error: " + res.status)
          return res.json()
      })
        .then(data => {
          if (!data[0]) {
            console.log("Clima no encontrado.")
            setNotFound(true)
            return
          }

          const lat = data[0].lat
          const lon = data[0].lon
          const currentWeatherUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
          // TYPE GUARD OR ASSERTION
          // fetch(currentWeatherUrl)
          //   .then(res => {
          //     if (!res.ok) throw new Error("HTTP error: " + res.status)
          //     return res.json()
          //   })
          //   .then(data => {
          //     console.log(data)
          //     isWeather(data) &&
          //     console.log(data.name)
          //     console.log(data.main.temp_max)
          //   })
          // })

          //Zod
          fetch(currentWeatherUrl)
            .then(res => res.json())
            .then(data => {
              const result = WeatherSchema.safeParse(data)
              if(!result.success) throw new Error("El tipo definido no concuerda con la informacion recibida.")
              setWeather(result.data)
            })
          //Valibot
          // fetch(currentWeatherUrl)
          // .then(res => res.json())
          // .then(data => {
          //   const result = parse(WeatherSchema, data)
          //     if(!result) throw new Error("El tipo definido no concuerda con la informacion recibida.")
          //     console.log(result.name + " " + result.main.temp_max + " " + result.main.temp_min)
          //   })
        })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    fetchWeather,
    weather,
    loading,
    notFound,
    hasWeatherData
  }
}