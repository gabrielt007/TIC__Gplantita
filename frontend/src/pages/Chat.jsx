import { useState } from "react"


const Chat = () => {
    const [chat, setChat] = useState(true)

    return (
        <>
            {chat ? (
                <div>
                    <h1 className='font-black text-2xl text-green-700 mb-4'>Centro de Alertas y Mensajes</h1>
                    <form className="flex justify-center gap-5">
                        <input
                            type="text"
                            placeholder="Ingresa tu nombre de usuario"
                            className="block w-1/2 rounded-md border border-gray-300 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 py-1 px-2 text-gray-500"
                        />
                        <button className="py-2 w-1/2 block text-center bg-green-700 text-white border rounded-xl hover:scale-100 duration-300 hover:bg-green-900">
                            Ingresar al chat
                        </button>
                    </form>
                </div>
            ) : (
                <div className="flex flex-col justify-center h-full">
                    <div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-green scrollbar-thumb-rounded scrollbar-w-2 scrolling-touch">
                    </div>
                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <form>
                            <div className="relative flex">
                                <input
                                    type="text"
                                    placeholder="Escribe tu mensaje o alerta..."
                                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 rounded-md py-3"
                                />
                                <button className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-green-800 hover:bg-green-600 focus:outline-none">
                                    <span className="font-bold">Enviar</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Chat
