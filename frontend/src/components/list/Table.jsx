import { MdDeleteForever, MdInfo, MdPublishedWithChanges } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import cultivoUser from "../../../../backend/src/models/cultivoUser"
import {useParams} from "react-router-dom"
import { useEffect } from "react"
import { fetchDataBackend } from "../../hooks/useFetch"
import {toastContainer, toast} from "react-toastify"


const Details =() =>{

    const {id} = useParams()
    const [cultivo , setCultivo] = useState({})
    const {fetchDataBackend} = useFetch()

    const [treatments, setTreatments] = useState({})

    useEffect(() => {
        const listPatient = async() =>{
            const url = `${import.meta.env.VITE_BACKEND_URL}/cultivos/detalle/${id}`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers = { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${storedUser.token}`
            }
            const data = await fetchDataBackend(url, headers)
            setTreatments(data)
            
            
        }
    }, [])


}


const deleteCultivo = async(id) => {
    const confirmDelete = confirm("¿Estas seguro de eliminar el cultivo?")
    if(confirmDelete){
        const url = `${import.meta.env.VITE_BACKEND_URL}/cultivos/eliminar/${id}`
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const options = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${storedUser.token}`
            }
        }

        const data = {
            tiempoCosecha: new Date().toISOString()
        }

        await fetchDataBackend(url, data, "DELETE", options.headers)

        setCultivos( (prevCultivos)=> prevCultivos.filter(cultivo => cultivo._id !== id))
    }
}


const Table = () => {

    const navigate = useNavigate()
    const {cultivoUser} = useParams()
    const users = ["Andrea","Rafael","Maria","Pedro","Juan","Maria","Pedro","Juan","Maria","Pedro","Juan"]





                                                                                                                                        


    return (
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
            <thead className="bg-green-800 text-slate-200">
                <tr>
                    {["N°", "Cultivo", "Responsable", "Email", "Zona", "Estado", "Acciones"].map((header) => (
                        <th key={header} className="p-2">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr className="hover:bg-green-50 text-center">
                    <td>1</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td className="py-2 text-center">
                        <MdInfo
                            title="Más información"
                            className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-green-700"
                            onClick={() => navigate(`/dashboard/details/${cultivoUser._id}`)}
                        />
                        <MdPublishedWithChanges
                            title="Actualizar"
                            className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-blue-600"
                            onClick={() => navigate(`/dashboard/update/${cultivoUser._id}`)}
                        />
                        <MdDeleteForever
                            title="Eliminar"
                            className="h-7 w-7 text-red-900 cursor-pointer inline-block hover:text-red-600"
                            onClick={()=>deleteCultivo(cultivoUser._id)}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table
