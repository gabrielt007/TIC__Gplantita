import { useClima } from "../hooks/useClima"
import storeProfile from "../context/storeProfile"

export default function Panel() {

  const inputCls = "w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400";

  // ── Obtener el perfil del usuario desde el store de Zustand ────
  const { user } = storeProfile()

  // ── Coordenadas dinámicas desde el perfil del usuario ──────────
  // user.latitud y user.longitud provienen del modelo userApp del backend.
  // Mientras el perfil se carga, serán undefined → el hook esperará sin error.
  const latitud  = user?.latitud  ?? null
  const longitud = user?.longitud ?? null
  const API_KEY  = import.meta.env.VITE_OPENWEATHER_API_KEY

  // ── Obtener datos del clima en tiempo real ─────────────────────
  const { clima, cargando, error } = useClima(latitud, longitud, API_KEY)

  return (
    <div className="min-h-screen bg-gray-100">

      <h1 className='font-black text-2xl text-green-700'>Métricas generales del invernadero</h1>
      <hr className='my-4 border-t-2 border-green-300' />

      {/* Tarjetas de métricas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">🌱 Cultivos activos</p>
          <p className="text-3xl font-semibold text-gray-800">24</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-400">
          <p className="text-sm text-gray-500">💧 Riegos hoy</p>
          <p className="text-3xl font-semibold text-gray-800">8</p>
        </div>

        {/* Tarjeta de temperatura — ahora con datos en tiempo real */}
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-400">
          <p className="text-sm text-gray-500">🌡️ Temp. actual (°C)</p>
          {cargando ? (
            <p className="text-xl text-gray-400 animate-pulse">Cargando...</p>
          ) : error ? (
            <p className="text-sm text-red-500" title={error}>⚠️ Error al obtener clima</p>
          ) : (
            <>
              <p className="text-3xl font-semibold text-gray-800">
                {clima?.temperatura?.toFixed(1)}°
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {clima?.descripcion} — {clima?.zona}
              </p>
            </>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-400">
          <p className="text-sm text-gray-500">🌾 Próximas cosechas</p>
          <p className="text-3xl font-semibold text-gray-800">5</p>
        </div>

      </section>

      <h1 className='font-black text-2xl text-green-700'>Automatizaciones con IA</h1>
      <hr className='my-4 border-t-2 border-green-300' />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Formulario: Programar riego */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Programar riego</h2>
          <hr className="mb-4" />
          <form className="space-y-3">
            <div>
              <label htmlFor="zona" className="text-sm text-gray-600">Zona del invernadero</label>
              <input id="zona" className={inputCls} placeholder="Ej. Zona A - Tomates" />
            </div>
            <div>
              <label htmlFor="cultivo" className="text-sm text-gray-600">Cultivo</label>
              <input id="cultivo" className={inputCls} placeholder="Nombre del cultivo" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="fecha" className="text-sm text-gray-600">Fecha</label>
                <input id="fecha" type="date" className={inputCls} />
              </div>
              <div>
                <label htmlFor="hora" className="text-sm text-gray-600">Hora</label>
                <input id="hora" type="time" className={inputCls} />
              </div>
            </div>
            <div>
              <label htmlFor="notas" className="text-sm text-gray-600">Notas (opcional)</label>
              <input id="notas" className={inputCls} placeholder="Ej. Riego profundo, fertilizante incluido..." />
            </div>
            <button type="button" className="w-full bg-green-800 text-white rounded-md py-2 hover:bg-green-700">
              Guardar programación
            </button>
          </form>
        </div>

        {/* Riegos del día */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <h2 className="text-xl font-semibold text-gray-700">
              Actividades del día:{" "}
              <span className="font-normal">
                {new Date().toLocaleDateString("es-EC")}
              </span>
            </h2>
            <button type="button" className="bg-green-800 text-white rounded-md py-2 px-4 hover:bg-green-700 w-full sm:w-auto">
              Consultar
            </button>
          </div>
          <hr className="mb-4" />
          <ul className="divide-y">
            <li className="py-3 flex justify-between">
              <div>
                <p className="font-medium text-gray-800">Hora: 07:00</p>
                <p className="text-sm text-gray-600">Zona: Zona B - Lechugas</p>
                <p className="text-sm text-gray-600">Cultivo: Lechuga romana</p>
                <p className="text-sm text-gray-600">Actividad: Riego automático</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded self-center">
                Completado
              </span>
            </li>
            <li className="py-3 flex justify-between">
              <div>
                <p className="font-medium text-gray-800">Hora: 14:00</p>
                <p className="text-sm text-gray-600">Zona: Zona A - Tomates</p>
                <p className="text-sm text-gray-600">Cultivo: Tomate cherry</p>
                <p className="text-sm text-gray-600">Actividad: Aplicación fertilizante</p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-700 font-bold px-2 py-1 rounded self-center">
                Pendiente
              </span>
            </li>
          </ul>
        </div>

      </section>

    </div>
  )
}
