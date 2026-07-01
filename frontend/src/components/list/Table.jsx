import { MdDeleteForever, MdInfo, MdPublishedWithChanges } from "react-icons/md"
import { useFetch } from "../../hooks/useFetch"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"


const Table = () => {

    const { fetchDataBackend } = useFetch()
    const [cultivos, setCultivos] = useState([])
    const navigate = useNavigate()

    const getHeaders = () => {
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        }
    }

    // ── Listar cultivos ──────────────────────────────────────────
    const listCultivos = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/cultivos`
        const response = await fetchDataBackend(url, null, "GET", getHeaders())
        setCultivos(response || [])
    }

    // ── Eliminar cultivo ─────────────────────────────────────────
    const deleteCultivo = async (id) => {
        const confirmDelete = confirm("¿Estás seguro de eliminar este cultivo?")
        if (!confirmDelete) return

        const url = `${import.meta.env.VITE_BACKEND_URL}/cultivo/eliminar/${id}`
        const data = {
            tiempoCosecha: new Date().toISOString()   // El backend lo requiere obligatorio
        }
        const response = await fetchDataBackend(url, data, "DELETE", getHeaders())

        if (response) {
            // Quita el cultivo eliminado de la lista sin recargar la página
            setCultivos(prev => prev.filter(cultivo => cultivo._id !== id))
        }
    }

    useEffect(() => {
        listCultivos()
    }, [])


    if (cultivos.length === 0) {
        return (
            <>
                <ToastContainer />
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50
                dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">No existen registros de cultivos</span>
                </div>
            </>
        )
    }

    return (
        <>
            <ToastContainer />

            <table className="w-full mt-5 table-auto shadow-lg bg-white">

                {/* Encabezado */}
                <thead className="bg-gray-800 text-slate-400">
                    <tr>
                        {["N°", "Cultivo", "Propietario", "Email", "Tipo", "Estado", "Acciones"].map((header) => (
                            <th key={header} className="p-2">{header}</th>
                        ))}
                    </tr>
                </thead>

                {/* Cuerpo de la tabla */}
                <tbody>
                    {cultivos.map((cultivo, index) => (
                        <tr className="hover:bg-gray-100 text-center" key={cultivo._id}>

                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{cultivo.nombreCultivo}</td>
                            <td className="p-2">{cultivo.nombrePropietario}</td>
                            <td className="p-2">{cultivo.emailPropietario}</td>
                            <td className="p-2 capitalize">{cultivo.tipoPlanta}</td>

                            <td className="p-2">
                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                                    cultivo.estadoCultivo
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}>
                                    {cultivo.estadoCultivo ? "Cosechado" : "En curso"}
                                </span>
                            </td>

                            <td className="py-2 text-center">
                                <MdInfo
                                    title="Más información"
                                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-green-600"
                                    onClick={() => navigate(`/dashboard/details/${cultivo._id}`)}
                                />
                                <MdPublishedWithChanges
                                    title="Actualizar"
                                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-blue-600"
                                    onClick={() => navigate(`/dashboard/update/${cultivo._id}`)}
                                />
                                <MdDeleteForever
                                    title="Eliminar"
                                    className="h-7 w-7 text-red-900 cursor-pointer inline-block hover:text-red-600"
                                    onClick={() => deleteCultivo(cultivo._id)}
                                />
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </>
    )
}

export default Table
