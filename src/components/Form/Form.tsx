import styles from "./Form.module.css"
import { countries } from "../../data/countries"
import { useState } from "react"
import Alert from "../Alert/Alert"
import type { SearchType } from "../../types"

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({fetchWeather}:FormProps) {
  
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  })
  const [alert, setAlert] = useState("")
  
  const handleChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setSearch({...search, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios.")
      setTimeout(()=>{setAlert("")},2000)
      return
    }
    fetchWeather(search)
  }

  return (
    <form
      className={styles.form}
      onSubmit={e=>{handleSubmit(e)}}
    >
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="Ciudad"
          value={search.city}
          onChange={e=>{handleChange(e)}}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="country">Pais:</label>
        <select
          id="country"
          name="country"
          value={search.country}
          onChange={e=>{handleChange(e)}}
        >
          <option value="">-- Seleccione un Pais --</option>
          {countries.map(c => (
            <option
              key={c.code}
              value={c.code}
            >{c.name}</option>
          ))}
        </select>
      </div>
      <input
        className={styles.submit}
        type="submit"
        value="Consultar Clima"
      />
    </form>
  )
}