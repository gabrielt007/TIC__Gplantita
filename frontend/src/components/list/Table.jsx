import { MdDeleteForever, MdInfo, MdPublishedWithChanges } from "react-icons/md"

const Table = () => {
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
                        />
                        <MdPublishedWithChanges
                            title="Actualizar"
                            className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-blue-600"
                        />
                        <MdDeleteForever
                            title="Eliminar"
                            className="h-7 w-7 text-red-900 cursor-pointer inline-block hover:text-red-600"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table
