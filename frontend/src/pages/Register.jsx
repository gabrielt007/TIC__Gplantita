import { useState } from "react"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"
import { useFetch } from "../hooks/useFetch"

export const Register = () => {

    const [showPassword, setShowPassword] = useState(false)

    const { fetchDataBackend, loading } = useFetch()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const registerUser = async (dataForm) => {

        console.log(dataForm)

        const url = `${import.meta.env.VITE_BACKEND_URL}/registro`

        console.log(url)

        await fetchDataBackend(url, dataForm, "POST")
    }

    return (
        <div className="flex flex-col sm:flex-row h-screen">

            <ToastContainer />

            {/* FORMULARIO */}
            <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center">

                <div className="md:w-4/5 sm:w-full px-6">

                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">
                        Crear cuenta
                    </h1>

                    <small className="text-gray-400 block my-4 text-sm">
                        Por favor ingresa tus datos para registrarte
                    </small>

                    <form onSubmit={handleSubmit(registerUser)}>

                        {/* NOMBRE */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">
                                Nombre
                            </label>

                            <input
                                type="text"
                                placeholder="Ingresa tu nombre"
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                                {...register("nombre", {
                                    required: "El nombre es obligatorio",
                                    pattern: {
                                        value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                        message: "El nombre no puede contener números ni caracteres especiales"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "El nombre debe tener al menos 3 caracteres"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "El nombre debe tener como máximo 20 caracteres"
                                    }
                                })}
                            />

                            {errors.nombre && (
                                <p className="text-red-800 text-sm mt-1">
                                    {errors.nombre.message}
                                </p>
                            )}
                        </div>

                        {/* APELLIDO */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">
                                Apellido
                            </label>

                            <input
                                type="text"
                                placeholder="Ingresa tu apellido"
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                                {...register("apellido", {
                                    required: "El apellido es obligatorio",
                                    pattern: {
                                        value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                        message: "El apellido no puede contener números ni caracteres especiales"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "El apellido debe tener al menos 3 caracteres"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "El apellido debe tener como máximo 20 caracteres"
                                    }
                                })}
                            />

                            {errors.apellido && (
                                <p className="text-red-800 text-sm mt-1">
                                    {errors.apellido.message}
                                </p>
                            )}
                        </div>

                        {/* DIRECCION */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">
                                Dirección
                            </label>

                            <input
                                type="text"
                                placeholder="Ingresa tu dirección"
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                                {...register("direccion", {
                                    required: "La dirección es obligatoria"
                                })}
                            />

                            {errors.direccion && (
                                <p className="text-red-800 text-sm mt-1">
                                    {errors.direccion.message}
                                </p>
                            )}
                        </div>

                        {/* CELULAR */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">
                                Celular
                            </label>

                            <input
                                type="text"
                                inputMode="tel"
                                placeholder="Ingresa tu celular"
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                                {...register("celular", {
                                    required: "El celular es obligatorio",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "El celular debe tener 10 dígitos"
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "El celular debe tener al menos 10 dígitos"
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "El celular debe tener como máximo 10 dígitos"
                                    }
                                })}
                            />

                            {errors.celular && (
                                <p className="text-red-800 text-sm mt-1">
                                    {errors.celular.message}
                                </p>
                            )}
                        </div>

                        {/* EMAIL */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">
                                Correo electrónico
                            </label>

                            <input
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                                {...register("email", {
                                    required: "El correo es obligatorio",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "El formato de correo no es válido"
                                    }
                                })}
                            />

                            {errors.email && (
                                <p className="text-red-800 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div className="mb-3">

                            <label className="block text-sm font-semibold mb-1">
                                Contraseña
                            </label>

                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="************"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10"
                                    {...register("password", {
                                        required: "La contraseña es obligatoria",
                                        minLength: {
                                            value: 8,
                                            message: "La contraseña debe tener al menos 8 caracteres"
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: "La contraseña debe tener como máximo 16 caracteres"
                                        }
                                    })}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {
                                        showPassword
                                            ? <MdVisibilityOff size={20} />
                                            : <MdVisibility size={20} />
                                    }
                                </button>

                            </div>

                            {errors.password && (
                                <p className="text-red-800 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* BOTON */}
                        <div className="mb-3">

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white"
                            >
                                {
                                    loading
                                        ? "Registrando..."
                                        : "Registrarse"
                                }
                            </button>

                        </div>

                    </form>

                    {/* LOGIN */}
                    <div className="mt-3 text-sm flex justify-between items-center">

                        <p>¿Ya posees una cuenta?</p>

                        <Link
                            to="/login"
                            className="py-2 px-5 bg-green-700 text-white border rounded-xl hover:scale-110 duration-300 hover:bg-green-900"
                        >
                            Iniciar sesión
                        </Link>

                    </div>

                </div>

            </div>

            {/* PANEL DERECHO */}
            <div className="hidden sm:flex sm:w-1/2 bg-gradient-to-bl from-green-800 to-green-500 flex-col items-center justify-center text-white p-10">

                <div className="text-[8rem] mb-6 select-none">
                    🌱
                </div>

                <h2 className="text-4xl font-black mb-4">
                    GreenHOUSE
                </h2>

                <p className="text-xl text-green-100 text-center">
                    Únete y comienza a gestionar tu invernadero
                </p>

                <div className="flex gap-6 mt-10 text-5xl">
                    <span>🌿</span>
                    <span>🌾</span>
                    <span>🏡</span>
                </div>

            </div>

        </div>
    )
}