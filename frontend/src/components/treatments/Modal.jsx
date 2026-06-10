const ModalTreatments = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-green-900 rounded-lg shadow-lg overflow-y-auto max-w-lg w-full border border-green-700 relative">
                <p className="text-white font-bold text-lg text-center mt-4">Registrar Actividad</p>
                <form className="p-10">

                    {/* Nombre de la actividad */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-100">Nombre de la actividad</label>
                        <input
                            type="text"
                            placeholder="Ej. Riego, Fertilización, Poda..."
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5 bg-gray-50"
                        />
                    </div>

                    {/* Detalle */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-100">Detalle</label>
                        <textarea
                            placeholder="Describe la actividad a realizar"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5 bg-gray-50"
                        />
                    </div>

                    {/* Prioridad */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-100">Prioridad</label>
                        <select
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5 bg-gray-50"
                        >
                            <option value="">--- Seleccionar ---</option>
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>

                    {/* Costo */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-100">Costo (USD)</label>
                        <input
                            type="text"
                            inputMode="decimal"
                            step="any"
                            placeholder="Ingresa el costo en dólares"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5 bg-gray-50"
                        />
                    </div>

                    <div className="flex justify-center gap-5">
                        <input
                            type="submit"
                            className="bg-green-600 px-6 text-slate-100 rounded-lg hover:bg-green-800 cursor-pointer py-2"
                            value="Registrar"
                        />
                        <button className="sm:w-auto leading-3 text-center text-white px-6 py-4 rounded-lg bg-red-700 hover:bg-red-900">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalTreatments
