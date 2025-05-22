import { useState, useContext } from 'react'
import { FaBars, FaShoppingCart, FaTimes } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import Search from './ui/Search'
import { storeContext } from '../context/useStore'

function Nabar() {
	const [isOpen, setIsOpen] = useState(false)
	const { totalItems } = useContext(storeContext)
	const location = useLocation()
	const pathname = location?.pathname
	const isActive = (path: string) => pathname === path

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	const handleSearch = (query: string) => {
		console.log('Buscando:', query)
	}

	return (
		<nav className='bg-white shadow-md sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16'>
					<div className='flex items-center flex-1'>
						{/* Logo */}
						<Link to='/' className='flex-shrink-0 flex items-center mr-4'>
							<span className='text-xl font-bold text-indigo-600'>
								TiendaLinea
							</span>
						</Link>

						{/* Search - visible en escritorio, oculto en móvil */}
						<div className='hidden md:block flex-grow max-w-md'>
							<Search
								onSearch={handleSearch}
								className='w-full'
								placeholder='Buscar productos, marcas...'
								maxResults={4}
							/>
						</div>
					</div>

					{/* Desktop menu */}
					<div className='hidden md:flex items-center space-x-6'>
						<Link
							to='/'
							className={`block px-3 py-2 rounded-md  ease-in-out transition duration-300  text-base font-medium ${
								isActive('/') ? 'text-indigo-600 bg-gray-400' : 'text-gray-700'
							} hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 `}
							onClick={toggleMenu}
						>
							Inicio
						</Link>
						<Link
							to='/on-sale'
							className={`block px-3 py-2 ease-in-out duration-300 transition  rounded-md text-base font-medium ${
								isActive('/on-sale')
									? 'text-indigo-600  bg-gray-400 '
									: 'text-gray-700  '
							} hover:text-indigo-600  hover:bg-gray-50 `}
							onClick={toggleMenu}
						>
							En oferta
						</Link>
						<Link
							to='/brands'
							className={`block px-3 py-2 rounded-md ease-in-out transition duration-300 text-base font-medium ${
								isActive('/brands')
									? 'text-indigo-600 bg-gray-400 '
									: 'text-gray-700 '
							} hover:text-indigo-600  hover:bg-gray-50`}
							onClick={toggleMenu}
						>
							Marcas
						</Link>

						{/* Carrito de compras */}
						<Link
							to='/cart'
							className='relative p-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200'
						>
							<FaShoppingCart className='h-5 w-5' />
							<span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full'>
								{totalItems}
							</span>
						</Link>
					</div>

					{/* Mobile menu button */}
					<div className='md:hidden flex items-center'>
						<Link to='/cart' className='relative p-2 mr-2 text-gray-700'>
							<FaShoppingCart className='h-5 w-5' />
							<span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full'>
								{totalItems}
							</span>
						</Link>
						<button
							onClick={toggleMenu}
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
							aria-expanded='false'
						>
							<span className='sr-only'>Abrir menú principal</span>
							{isOpen ? (
								<FaTimes className='block h-6 w-6' aria-hidden='true' />
							) : (
								<FaBars className='block h-6 w-6' aria-hidden='true' />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu, show/hide based on menu state */}
			{isOpen && (
				<div className='md:hidden bg-white shadow-lg'>
					{/* Búsqueda móvil */}
					<div className='px-4 pt-4 pb-2'>
						<Search
							onSearch={handleSearch}
							className='w-full'
							placeholder='Buscar productos, marcas...'
							maxResults={3}
						/>
					</div>

					{/* Enlaces de navegación */}
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200'>
						<Link
							to='/'
							className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
							onClick={toggleMenu}
						>
							Inicio
						</Link>
						<Link
							to='/on-sale'
							className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
							onClick={toggleMenu}
						>
							En oferta
						</Link>
						<Link
							to='/brands'
							className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
							onClick={toggleMenu}
						>
							Marcas
						</Link>
					</div>
				</div>
			)}
		</nav>
	)
}

export default Nabar
