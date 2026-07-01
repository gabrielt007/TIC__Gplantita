import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useFetch } from "../hooks/useFetch"
import { ToastContainer } from "react-toastify"


const Details = () => {

    const { id } = useParams()
    const { fetchDataBackend } = useFetch()
    const [cultivo, setCultivo] = useState(null)

    const getCultivo = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/cultivo/detalle/${id}`
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        }
        const response = await fetchDataBackend(url, null, "GET", headers)
        setCultivo(response)
    }

    useEffect(() => {
        getCultivo()
    }, [id])


    if (!cultivo) {
        return (
            <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Cargando datos del cultivo...</span>
            </div>
        )
    }

    return (
        <>
            <ToastContainer />

            {/* Encabezado */}
            <div>
                <h1 className="font-black text-4xl text-gray-700">Detalle del Cultivo</h1>
                <hr className="my-4 border-t-2 border-gray-300" />
                <p className="mb-8 text-gray-500">Visualiza todos los datos del cultivo registrado</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-8">

                {/* Datos */}
                <div className="flex-1">
                    <ul className="list-disc pl-5">

                        {/* Sección Propietario */}
                        <li className="text-xl font-bold text-gray-700 mt-4">Datos del propietario</li>
                        <ul className="pl-5">
                            <li className="text-md mt-2">
                                <span className="text-gray-600 font-bold">Nombre: </span>
                                {cultivo.nombrePropietario}
                            </li>
                            <li className="text-md mt-2">
                                <span className="text-gray-600 font-bold">Correo electrónico: </span>
                                {cultivo.emailPropietario}
                            </li>
                        </ul>

                        {/* Sección Cultivo */}
                        <li className="text-xl font-bold text-gray-700 mt-6">Datos del cultivo</li>
                        <ul className="pl-5">
                            <li className="text-md mt-2">
                                <span className="text-gray-600 font-bold">Nombre del cultivo: </span>
                                {cultivo.nombreCultivo}
                            </li>
                            <li className="text-md mt-2">
                                <span className="text-gray-600 font-bold">Tipo de planta: </span>
                                <span className="capitalize">{cultivo.tipoPlanta}</span>
                            </li>
                            <li className="text-md mt-2">
                                <span className="text-gray-600 font-bold">Cantidad: </span>
                                {cultivo.cantidad}
                            </li>
                            <li className="text-md mt-2">
                                <span className="text-gray-600 font-bold">Nivel de humedad: </span>
                                <span className="capitalize">{cultivo.nivelhumedad}</span>
                            </li>
                            <li className="text-md mt-2">
                                <span className="text-gray-600 font-bold">Nivel de riego: </span>
                                <span className="capitalize">{cultivo.nivelRiego}</span>
                            </li>
                            <li className="text-md mt-2">
                                <span className="text-gray-600 font-bold">Nivel de luz: </span>
                                <span className="capitalize">{cultivo.nivelLuz}</span>
                            </li>
                            <li className="text-md mt-2">
                                <span className="text-gray-600 font-bold">Tiempo de cosecha: </span>
                                {cultivo.tiempoCosecha}
                            </li>
                            <li className="text-md mt-2">
                                <span className="text-gray-600 font-bold">Estado de madurez: </span>
                                <span className="capitalize">{cultivo.estadoMadurezCultivo}</span>
                            </li>
                            <li className="text-md mt-2">
                                <span className="text-gray-600 font-bold">Fecha de ingreso: </span>
                                {cultivo.fechaIngresoCultivo
                                    ? new Date(cultivo.fechaIngresoCultivo).toLocaleDateString("es-EC")
                                    : "—"}
                            </li>
                            <li className="text-md mt-2">
                                <span className="text-gray-600 font-bold">Estado: </span>
                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                                    cultivo.estadoCultivo
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}>
                                    {cultivo.estadoCultivo ? "Cosechado" : "En curso"}
                                </span>
                            </li>
                            <li className="text-md mt-4">
                                <span className="text-gray-600 font-bold">Detalle / Observaciones: </span>
                                <p className="mt-1 text-gray-500">{cultivo.detalleCultivo}</p>
                            </li>
                        </ul>

                    </ul>
                </div>

                {/* Imagen del cultivo */}
                <div className="flex flex-col items-center gap-4">
                    {cultivo.avatarCultivo
                        ? (
                            <img
                                src={cultivo.avatarCultivo}
                                alt={`Imagen de ${cultivo.nombreCultivo}`}
                                className="h-64 w-64 object-cover rounded-xl shadow-md"
                            />
                        )
                        : (
                            <div className="h-64 w-64 flex items-center justify-center text-[6rem] rounded-xl bg-gray-100 shadow-md">
                                🌿
                            </div>
                        )
                    }
                    <span className="text-gray-400 text-sm">Imagen del cultivo</span>
                </div>

            </div>
        </>
    )
}

export default Details
