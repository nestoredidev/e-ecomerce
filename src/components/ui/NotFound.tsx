import { Link } from 'react-router-dom'
import { FaHome, FaRocket, FaSatellite } from 'react-icons/fa'

function NotFound() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-4'>
			<div className='max-w-3xl w-full text-center relative'>
				{/* Partículas de fondo */}
				<div className='absolute inset-0 overflow-hidden'>
					{[...Array(20)].map((_, i) => (
						<div
							key={i}
							className='absolute h-1 w-1 rounded-full bg-white opacity-40 animate-pulse'
							style={{
								top: `${Math.random() * 100}%`,
								left: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 2}s`,
								animationDuration: `${3 + Math.random() * 5}s`,
							}}
						/>
					))}
				</div>

				{/* Efecto de satélites */}
				<div className='absolute -top-12 -left-12 text-indigo-400 animate-spin-slow opacity-60'>
					<FaSatellite size={48} />
				</div>
				<div className='absolute top-10 right-10 text-purple-400 animate-float opacity-70'>
					<FaRocket size={36} />
				</div>

				{/* Contenido principal */}
				<div className='relative backdrop-blur-sm bg-black/30 p-8 rounded-2xl border border-indigo-500/30 shadow-xl'>
					{/* Número de error con efecto de glitch */}
					<div className='text-9xl font-bold mb-4 relative'>
						<span className='absolute top-0 left-0 right-0 text-red-500 animate-glitch-1 opacity-70'>
							404
						</span>
						<span className='absolute top-0 left-0 right-0 text-blue-500 animate-glitch-2 opacity-70'>
							404
						</span>
						<span className='relative'>404</span>
					</div>

					{/* Mensaje */}
					<h1 className='text-2xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>
						Dimensión no encontrada
					</h1>

					<p className='text-lg mb-8 max-w-lg mx-auto text-gray-300'>
						La ruta que buscas parece haberse perdido en el espacio-tiempo.
						Nuestros drones de búsqueda no pudieron localizarla.
					</p>

					{/* Botón de regreso */}
					<Link
						to='/'
						className='inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium transition-transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30'
					>
						<FaHome className='mr-2' />
						Volver a la base
					</Link>

					{/* Barra de carga infinita */}
					<div className='mt-12 h-1 bg-gray-800 rounded-full overflow-hidden max-w-md mx-auto'>
						<div className='h-full bg-indigo-500 animate-loading-bar rounded-full'></div>
					</div>
					<p className='text-xs mt-3 text-gray-400'>
						Reconectando con el servidor principal...
					</p>
				</div>
			</div>
		</div>
	)
}

export default NotFound
