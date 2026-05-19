import { useState } from "react"
import TableTreatments from "../components/treatments/Table"
import ModalTreatments from "../components/treatments/Modal"


const Details = () => {
    const [treatments, setTreatments] = useState(["demo"])

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-green-700'>Detalle del Cultivo</h1>
                <hr className='my-4 border-t-2 border-green-300' />
                <p className='mb-8'>Este módulo te permite visualizar todos los datos del cultivo registrado</p>
            </div>

            <div>
                <div className='m-5 flex justify-between'>
                    <div>
                        <ul className="list-disc pl-5">

                            <li className="text-md mt-4 font-bold text-xl text-green-800">Datos del responsable</li>
                            <ul className="pl-5">
                                <li className="text-md mt-2"><span className="text-gray-600 font-bold">Cédula: </span></li>
                                <li className="text-md mt-2"><span className="text-gray-600 font-bold">Nombres completos: </span></li>
                                <li className="text-md mt-2"><span className="text-gray-600 font-bold">Correo electrónico: </span></li>
                                <li className="text-md mt-2"><span className="text-gray-600 font-bold">Celular: </span></li>
                            </ul>

                            <li className="text-md mt-4 font-bold text-xl text-green-800">Datos del cultivo</li>
                            <ul className="pl-5">
                                <li className="text-md mt-2"><span className="text-gray-600 font-bold">Nombre: </span></li>
                                <li className="text-md mt-2"><span className="text-gray-600 font-bold">Tipo: </span></li>
                                <li className="text-md mt-2"><span className="text-gray-600 font-bold">Zona del invernadero: </span></li>
                                <li className="text-md mt-2"><span className="text-gray-600 font-bold">Fecha de siembra: </span></li>
                                <li className="text-md mt-2"><span className="text-gray-600 font-bold">Fecha estimada de cosecha: </span></li>
                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Estado: </span>
                                    <span className="bg-green-100 text-green-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"></span>
                                </li>
                                <li className="text-md mt-4"><span className="text-gray-600 font-bold">Observaciones: </span></li>
                            </ul>

                        </ul>
                    </div>

                    {/* Imagen lateral */}
                    <div>
                        <div className="h-80 w-80 flex items-center justify-center text-[8rem]">🌿</div>
                    </div>
                </div>

                <hr className='my-4 border-t-2 border-green-300' />

                {/* Sección de actividades */}
                <div className='flex justify-between items-center'>
                    <p>Este módulo te permite gestionar las actividades del cultivo</p>
                    {true && (
                        <button className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">
                            Registrar actividad
                        </button>
                    )}
                    {false && <ModalTreatments />}
                </div>

                {treatments.length === 0
                    ? (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">No existen actividades registradas</span>
                        </div>
                    )
                    : <TableTreatments treatments={treatments} />
                }
            </div>
        </>
    )
}

export default Details
