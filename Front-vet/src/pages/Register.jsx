import { useState } from "react"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { Link } from "react-router"


export const Register = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="flex flex-col sm:flex-row h-screen">

            <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center">
                <div className="md:w-4/5 sm:w-full">

                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">Crear cuenta</h1>
                    <small className="text-gray-400 block my-4 text-sm">Por favor ingresa tus datos para registrarte</small>

                    <form>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Nombre</label>
                            <input type="text" placeholder="Ingresa tu nombre" className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500" />
                        </div>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Apellido</label>
                            <input type="text" placeholder="Ingresa tu apellido" className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500" />
                        </div>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Dirección</label>
                            <input type="text" placeholder="Ingresa tu dirección de domicilio" className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500" />
                        </div>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Celular</label>
                            <input type="text" inputMode="tel" placeholder="Ingresa tu celular" className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500" />
                        </div>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                            <input type="email" placeholder="Ingresa tu correo electrónico" className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500" />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-semibold mb-1">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="************"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <button className="bg-green-700 text-white border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-green-900">
                                Registrarse
                            </button>
                        </div>
                    </form>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>¿Ya posees una cuenta?</p>
                        <Link to="/login" className="py-2 px-5 bg-green-700 text-white border rounded-xl hover:scale-110 duration-300 hover:bg-green-900">
                            Iniciar sesión
                        </Link>
                    </div>

                </div>
            </div>

            {/* Panel derecho decorativo */}
            <div className="hidden sm:flex sm:w-1/2 bg-gradient-to-bl from-green-800 to-green-500 flex-col items-center justify-center text-white p-10">
                <div className="text-[8rem] mb-6 select-none">🌱</div>
                <h2 className="text-4xl font-black mb-4">GreenHOUSE</h2>
                <p className="text-xl text-green-100 text-center">Únete y comienza a gestionar tu invernadero</p>
                <div className="flex gap-6 mt-10 text-5xl">
                    <span>🌿</span><span>🌾</span><span>🏡</span>
                </div>
            </div>

        </div>
    )
}
