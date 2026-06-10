import { Link } from 'react-router'
import { MdDashboard } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { FaCommentSms } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { GiWateringCan, GiThermometerCold } from "react-icons/gi";
import { TbPlant2, TbReportAnalytics } from "react-icons/tb";
import { MdOutlineSensors } from "react-icons/md";


export const Home = () => {
    return (
        <>
            <header className="container mx-auto h-40 text-center py-4 md:flex justify-between items-center px-4 md:h-15">
                <h1 className='font-bold text-2xl my-2 text-green-700'>Green<span className='text-black'>HOUSE</span></h1>
                <ul className='flex gap-5 justify-center my-4 flex-wrap'>
                    <li><a href="#" className='font-bold hover:text-green-700 hover:underline'>Inicio</a></li>
                    <li><a href="#" className='font-bold hover:text-green-700 hover:underline'>Nosotros</a></li>
                    <li><a href="#" className='font-bold hover:text-green-700 hover:underline'>Servicios</a></li>
                    <li><a href="#" className='font-bold hover:text-green-700 hover:underline'>Contacto</a></li>
                </ul>
                <ul className='flex justify-center items-center gap-5 my-4'>
                    <li><span className="text-2xl">🌿</span></li>
                </ul>
            </header>

            <main className='text-center py-6 px-8 bg-green-50 md:text-left md:flex justify-between items-center gap-10 md:py-1'>
                <div className=''>
                    <h1 className='font-lato font-extrabold text-green-800 uppercase text-4xl my-4 md:text-6xl'>Software inteligente</h1>
                    <p className='font-bold text-left my-8 md:text-2xl underline'>Potenciado por</p>
                    <p className='text-2xl my-6 font-sans'>Inteligencia artificial, monitoreo en tiempo real, alertas de riego y mucho más...</p>
                    <Link to="/login" className='block bg-green-800 w-40 py-2 mx-auto text-white rounded-2xl text-center sm:mx-0 hover:bg-green-700'>Comenzar</Link>
                    <p className='font-bold text-left my-4 md:text-2xl'>Encuéntranos</p>
                    <div className="flex justify-center gap-4">
                        <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg border border-green-300">
                            <span className="text-2xl">🌱</span>
                            <span className="font-semibold text-green-800 text-sm">App Store</span>
                        </div>
                        <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg border border-green-300">
                            <span className="text-2xl">🌿</span>
                            <span className="font-semibold text-green-800 text-sm">Google Play</span>
                        </div>
                    </div>
                </div>
                <div className='hidden md:flex items-center justify-center text-[10rem] select-none'>
                    🏡
                </div>
            </main>

            <section className='container mx-auto px-4'>
                <div className='container mx-auto relative mt-6'>
                    <h2 className='font-semibold text-3xl relative z-1 w-50 text-center mx-auto bg-white'>NOSOTROS</h2>
                    <div className='text-green-900 border-2 absolute top-1/2 w-full z-0' />
                </div>
                <div className='my-10 flex flex-col gap-10 items-center sm:flex-row sm:justify-around sm:items-center'>
                    <div className='sm:w-1/2 flex items-center justify-center text-[8rem] select-none'>🌾</div>
                    <div className='px-10 sm:w-1/2'>
                        <p className='my-4'>GreenHOUSE es el primer software del mercado para invernaderos que incluye</p>
                        <ul className='space-y-4'>
                            <li><MdDashboard className='inline text-2xl mr-2 text-green-700' />Panel administrativo</li>
                            <li><FaRobot className='inline text-2xl mr-2 text-green-700' />Inteligencia artificial</li>
                            <li><BsCashCoin className='inline text-2xl mr-2 text-green-700' />Gestión de costos</li>
                            <li><FaCommentSms className='inline text-2xl mr-2 text-green-700' />Alertas en tiempo real</li>
                            <li><TbPlant2 className='inline text-2xl mr-2 text-green-700' />Gestión de cultivos</li>
                            <li><GiWateringCan className='inline text-2xl mr-2 text-green-700' />Control de riego</li>
                            <li><GiThermometerCold className='inline text-2xl mr-2 text-green-700' />Monitoreo ambiental</li>
                        </ul>
                        <p className='my-4'>Y más funcionalidades que aprovechan las tecnologías modernas</p>
                    </div>
                </div>
            </section>

            <section className='container mx-auto px-4'>
                <div className='container mx-auto relative mt-6'>
                    <h2 className='font-semibold text-3xl relative z-1 w-50 text-center mx-auto bg-white'>SERVICIOS</h2>
                    <div className='text-green-900 border-2 absolute top-1/2 w-full z-0' />
                </div>
                <div className='my-10 flex justify-between flex-wrap gap-5'>
                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 sm:flex-1">
                        <TbPlant2 className='inline text-5xl text-green-700' />
                        <h4 className="text-xl font-bold py-4 text-green-700 hover:underline">Gestión de Cultivos</h4>
                        <p className="my-4 px-2">Registra, monitorea y gestiona todos tus cultivos en un solo lugar. Controla el crecimiento, etapas de cosecha y salud de cada planta.</p>
                        <hr className="border-1 border-green-900 absolute w-full" />
                    </div>
                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 bg-green-50 sm:flex-1">
                        <GiWateringCan className='inline text-5xl text-green-700' />
                        <h4 className="text-xl font-bold py-4 text-green-700 hover:underline">Control de Riego</h4>
                        <p className="my-4 px-2">Programa y automatiza el sistema de riego. Recibe alertas cuando tus plantas necesiten agua y registra el historial de riegos.</p>
                        <hr className="border-1 border-green-900 absolute w-full" />
                    </div>
                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 bg-green-50 sm:flex-1">
                        <MdOutlineSensors className='inline text-5xl text-green-700' />
                        <h4 className="text-xl font-bold py-4 text-green-700 hover:underline">Monitoreo Ambiental</h4>
                        <p className="my-4 px-2">Controla temperatura, humedad y luminosidad en tiempo real. Recibe alertas automáticas ante condiciones adversas para tus plantas.</p>
                        <hr className="border-1 border-green-900 absolute w-full" />
                    </div>
                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 sm:flex-1">
                        <TbReportAnalytics className='inline text-5xl text-green-700' />
                        <h4 className="text-xl font-bold py-4 text-green-700 hover:underline">Reportes y Costos</h4>
                        <p className="my-4 px-2">Genera reportes de producción, controla costos de insumos y gestiona los pagos de manera integrada con tu sistema de invernadero.</p>
                        <hr className="border-1 border-green-900 absolute w-full" />
                    </div>
                </div>
            </section>

            <footer className='text-center bg-green-50 p-6 sm:px-20 sm:py-10 mt-20 rounded-tr-3xl rounded-tl-3xl space-y-8'>
                <div className='flex justify-between items-center'>
                    <div className='text-3xl font-extrabold text-green-800'>Contáctanos</div>
                    <ul className='flex gap-4'>
                        <li><FaFacebook className='text-2xl' /></li>
                        <li><FaSquareInstagram className='text-2xl' /></li>
                        <li><FaXTwitter className='text-2xl' /></li>
                    </ul>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='text-left'>
                        <p className='font-bold my-2'>Email: admin@greenhouse.com</p>
                        <p className='font-bold'>Teléfono: 0995644186</p>
                    </div>
                    <div className='flex-1 sm:max-w-1/2'>
                        <form action="#" className='w-full p-4'>
                            <fieldset className='border-2 border-green-900 p-4 rounded-sm'>
                                <legend className='bg-green-950 w-full text-left text-white pl-2 py-2'>Suscríbete a nuestro boletín</legend>
                                <div className='flex justify-between gap-4'>
                                    <input type="email" placeholder="Ingresa tu correo" className='sm:flex-1 border border-gray-300 rounded-md focus:outline-none px-2' />
                                    <button className='flex-1 sm:max-w-40 border bg-green-950 p-1 rounded-lg text-white'>Enviar</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <hr className='border-1 border-green-800' />
                <p className='font-semibold'>copyright - © - GreenHOUSE</p>
            </footer>
        </>
    )
}
