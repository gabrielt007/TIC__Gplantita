import { useState } from "react"


export const Form = () => {

    const [stateAvatar, setStateAvatar] = useState({
        generatedImage: "https://cdn-icons-png.flaticon.com/512/2913/2913133.png",
        prompt: "",
        loading: false
    })

    const [selectedOption, setSelectedOption] = useState("ia")

    return (
        <form>

            {/* Información del responsable */}
            <fieldset className="border-2 border-green-600 p-6 rounded-lg shadow-lg">
                <legend className="text-xl font-bold text-gray-700 bg-green-100 px-4 py-1 rounded-md">
                    Información del responsable
                </legend>

                {/* Cédula */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Cédula</label>
                    <div className="flex items-center gap-10 mb-5">
                        <input
                            type="number"
                            inputMode="numeric"
                            placeholder="Ingresa la cédula"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                        />
                        <button className="py-1 px-8 bg-green-700 text-slate-100 border rounded-xl hover:scale-110 duration-300 hover:bg-green-900 hover:text-white sm:w-80">
                            Consultar
                        </button>
                    </div>
                </div>

                {/* Nombres completos */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Nombres completos</label>
                    <input
                        type="text"
                        placeholder="Ingresa nombre y apellido"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                    />
                </div>

                {/* Correo electrónico */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="Ingresa el correo electrónico"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                    />
                </div>

                {/* Celular */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Celular</label>
                    <input
                        type="text"
                        inputMode="tel"
                        placeholder="Ingresa el celular"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                    />
                </div>
            </fieldset>

            {/* Información del cultivo */}
            <fieldset className="border-2 border-green-600 p-6 rounded-lg shadow-lg mt-10">
                <legend className="text-xl font-bold text-gray-700 bg-green-100 px-4 py-1 rounded-md">
                    Información del cultivo
                </legend>

                {/* Nombre del cultivo */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Nombre del cultivo</label>
                    <input
                        type="text"
                        placeholder="Ej. Tomate cherry, Lechuga romana..."
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                    />
                </div>

                {/* Imagen del cultivo */}
                <label className="mb-2 block text-sm font-semibold">Imagen del cultivo</label>
                <div className="flex gap-4 mb-2">
                    <label className="flex items-center gap-2">
                        <input type="radio" value="ia" checked={selectedOption === "ia"} onChange={() => setSelectedOption("ia")} />
                        Generar con IA
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" value="upload" checked={selectedOption === "upload"} onChange={() => setSelectedOption("upload")} />
                        Subir Imagen
                    </label>
                </div>

                {selectedOption === "ia" && (
                    <div className="mt-5">
                        <label className="mb-2 block text-sm font-semibold">Imagen con IA</label>
                        <div className="flex items-center gap-10 mb-5">
                            <input
                                type="text"
                                placeholder="Describe el cultivo para generar imagen..."
                                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                                value={stateAvatar.prompt}
                                onChange={(e) => setStateAvatar(prev => ({ ...prev, prompt: e.target.value }))}
                            />
                            <button
                                type="button"
                                className="py-1 px-8 bg-green-700 text-slate-100 border rounded-xl hover:scale-110 duration-300 hover:bg-green-900 hover:text-white sm:w-80"
                                disabled={stateAvatar.loading}
                            >
                                {stateAvatar.loading ? "Generando..." : "Generar con IA"}
                            </button>
                        </div>
                        {stateAvatar.generatedImage && (
                            <img src={stateAvatar.generatedImage} alt="Imagen cultivo IA" width={100} height={100} />
                        )}
                    </div>
                )}

                {selectedOption === "upload" && (
                    <div className="mt-5">
                        <label className="mb-2 block text-sm font-semibold">Subir Imagen</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Tipo de cultivo */}
                    <div>
                        <label htmlFor="tipo" className="mb-2 block text-sm font-semibold">Tipo de cultivo</label>
                        <select
                            id="tipo"
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                            defaultValue=""
                        >
                            <option value="">--- Seleccionar ---</option>
                            <option value="hortaliza">Hortaliza</option>
                            <option value="fruto">Fruto</option>
                            <option value="hierba">Hierba aromática</option>
                            <option value="flor">Flor</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    {/* Fecha de siembra */}
                    <div>
                        <label htmlFor="fechaSiembra" className="mb-2 block text-sm font-semibold">Fecha de siembra</label>
                        <input
                            id="fechaSiembra"
                            type="date"
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {/* Zona del invernadero */}
                    <div>
                        <label htmlFor="zona" className="mb-2 block text-sm font-semibold">Zona del invernadero</label>
                        <input
                            id="zona"
                            type="text"
                            placeholder="Ej. Zona A, Sector 2..."
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                        />
                    </div>

                    {/* Fecha estimada de cosecha */}
                    <div>
                        <label htmlFor="fechaCosecha" className="mb-2 block text-sm font-semibold">Fecha estimada de cosecha</label>
                        <input
                            id="fechaCosecha"
                            type="date"
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                        />
                    </div>
                </div>

                {/* Observaciones */}
                <div className="mt-4">
                    <label className="mb-2 block text-sm font-semibold">Observaciones</label>
                    <textarea
                        placeholder="Ingresa condiciones especiales, síntomas, notas de cultivo..."
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                    />
                </div>

            </fieldset>

            {/* Botón de registro */}
            <input
                type="submit"
                className="bg-green-800 w-full p-2 mt-5 text-slate-100 uppercase font-bold rounded-lg hover:bg-green-700 cursor-pointer transition-all"
                value="Registrar cultivo"
            />

        </form>
    )
}
