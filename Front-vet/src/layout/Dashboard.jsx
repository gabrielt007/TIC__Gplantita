import { Link, Outlet, useLocation } from 'react-router'


const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname

    return (
        <div className='md:flex md:min-h-screen'>

            {/* Menú de navegación lateral */}
            <div className='md:w-1/5 bg-green-900 px-5 py-4'>

                <h2 className='text-4xl font-black text-center text-green-100'>GREENHOUSE</h2>

                <div className="m-auto mt-8 p-1 border-2 border-green-500 rounded-full w-[120px] h-[120px] flex items-center justify-center text-6xl bg-green-800">
                    🌱
                </div>

                {/* Nombre de usuario */}
                <p className='text-green-300 text-center my-4 text-sm'>
                    <span className='bg-green-400 w-3 h-3 inline-block rounded-full'></span> Bienvenido -
                </p>

                {/* Rol de usuario */}
                <p className='text-green-300 text-center my-4 text-sm'>Rol -</p>

                <hr className="mt-5 border-green-600" />

                {/* Enlaces de navegación */}
                <ul className="mt-5">
                    <li className="text-center">
                        <Link to='/dashboard'
                            className={`${urlActual === '/dashboard' ? 'text-green-100 bg-green-950 px-3 py-2 rounded-md text-center' : 'text-green-500'} text-xl block mt-2 hover:text-green-400`}>
                            Dashboard
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link to='/dashboard/profile'
                            className={`${urlActual === '/dashboard/profile' ? 'text-green-100 bg-green-950 px-3 py-2 rounded-md text-center' : 'text-green-500'} text-xl block mt-2 hover:text-green-400`}>
                            Perfil
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link to='/dashboard/list'
                            className={`${urlActual === '/dashboard/list' ? 'text-green-100 bg-green-950 px-3 py-2 rounded-md text-center' : 'text-green-500'} text-xl block mt-2 hover:text-green-400`}>
                            Cultivos
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link to='/dashboard/create'
                            className={`${urlActual === '/dashboard/create' ? 'text-green-100 bg-green-950 px-3 py-2 rounded-md text-center' : 'text-green-500'} text-xl block mt-2 hover:text-green-400`}>
                            Registrar
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link to='/dashboard/chat'
                            className={`${urlActual === '/dashboard/chat' ? 'text-green-100 bg-green-950 px-3 py-2 rounded-md text-center' : 'text-green-500'} text-xl block mt-2 hover:text-green-400`}>
                            Alertas
                        </Link>
                    </li>
                </ul>

            </div>

            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>

                {/* Menú de navegación superior */}
                <div className='bg-green-900 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div className='text-md font-semibold text-green-100'>
                        Usuario -
                    </div>
                    <div>
                        <div className="border-2 border-green-400 rounded-full w-[50px] h-[50px] flex items-center justify-center text-2xl bg-green-800">
                            🌿
                        </div>
                    </div>
                    <div>
                        <Link to='/' className="text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-800 px-4 py-1 rounded-lg">Salir</Link>
                    </div>
                </div>

                {/* Contenido de las páginas internas */}
                <div className='overflow-y-scroll p-8'>
                    <Outlet />
                </div>

                <div className='bg-green-900 h-12'>
                    <p className='text-center text-green-100 leading-[2.9rem] underline'>Todos los derechos reservados</p>
                </div>

            </div>

        </div>
    )
}

export default Dashboard
