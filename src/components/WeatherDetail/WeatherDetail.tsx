import styles from "./WeatherDetail.module.css"
import { Convert } from "../../helpers"
import type { Weather } from "../../hooks/useWeather"

type WeatherDetailProps = {
  weather: Weather
}

export default function WeatherDetail({weather}:WeatherDetailProps) {
  return (
    <>
      <div className={styles.container}>
        <h2>Clima de: {weather.name}</h2>
        <p className={styles.current}>{Convert("temperature",weather.main.temp,"kelvin","celsius").toFixed(2)} &deg;C</p>
        <div className={styles.temperatures}>
          <p>Min: <span>{Convert("temperature",weather.main.temp_min,"kelvin","celsius").toFixed(2)} &deg;C</span></p>
          <p>Max: <span>{Convert("temperature",weather.main.temp_max,"kelvin","celsius").toFixed(2)} &deg;C</span></p>
        </div>
      </div>
    </>
  )
}