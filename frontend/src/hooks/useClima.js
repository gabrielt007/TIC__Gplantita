import { useState, useEffect } from "react"


/**
 * useClima - Custom hook para obtener el clima actual desde OpenWeatherMap.
 *
 * @param {number} lat   - Latitud de la ubicación.
 * @param {number} lon   - Longitud de la ubicación.
 * @param {string} apiKey - API Key personal de OpenWeatherMap.
 *
 * @returns {{ clima: object|null, cargando: boolean, error: string|null }}
 *   - clima:    Objeto con los datos limpios del clima (temperatura, descripción, zona, etc.).
 *   - cargando: Indica si la petición está en curso.
 *   - error:    Mensaje de error si la petición falló, o null si todo está bien.
 */
export function useClima(lat, lon, apiKey) {

  // ── Estados locales ──────────────────────────────────────────────
  const [clima, setCLima] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // ── Si falta la API Key, es un error de configuración ────────
    if (!apiKey) {
      setError("Falta la API Key de OpenWeatherMap.")
      setCargando(false)
      return
    }

    // ── Si las coordenadas aún no están disponibles (ej. storeProfile
    //    todavía cargando), el hook "espera" sin lanzar error ────────
    if (lat == null || lon == null) {
      setCargando(true)
      return
    }

    // ── Función asíncrona para realizar la petición ──────────────
    const obtenerClima = async () => {
      setCargando(true)
      setError(null)

      try {
        // Construir la URL con los parámetros requeridos y opcionales
        const url =
          `https://api.openweathermap.org/data/2.5/weather` +
          `?lat=${lat}` +
          `&lon=${lon}` +
          `&appid=${apiKey}` +
          `&units=metric` +   // Temperatura en °C
          `&lang=es`          // Descripciones en español

        const respuesta = await fetch(url)
        const datos = await respuesta.json()

        // ── Validar que la respuesta sea exitosa (cod === 200) ────
        if (datos.cod !== 200) {
          throw new Error(datos.message || "Error desconocido de la API")
        }

        // ── Extraer y estructurar los datos relevantes ───────────
        setCLima({
          temperatura: datos.main.temp,           // Temperatura actual en °C
          sensacion:   datos.main.feels_like,      // Sensación térmica en °C
          tempMin:     datos.main.temp_min,         // Temperatura mínima
          tempMax:     datos.main.temp_max,         // Temperatura máxima
          humedad:     datos.main.humidity,         // Humedad relativa (%)
          descripcion: datos.weather?.[0]?.description || "", // Descripción del clima
          icono:       datos.weather?.[0]?.icon || "",        // Código del ícono
          zona:        datos.name,                  // Nombre de la estación / zona
        })

      } catch (err) {
        setError(err.message || "No se pudo obtener el clima.")
        setCLima(null)
      } finally {
        setCargando(false)
      }
    }

    obtenerClima()

    // ── Actualizar cada 10 minutos (600 000 ms) ──────────────────
    // OpenWeatherMap actualiza datos internos cada 10-15 min,
    // por lo que no tiene sentido hacer peticiones más frecuentes.
    const intervalo = setInterval(obtenerClima, 600_000)

    return () => clearInterval(intervalo) // Limpieza al desmontar
  }, [lat, lon, apiKey])

  return { clima, cargando, error }
}
