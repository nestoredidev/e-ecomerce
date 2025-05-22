import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { storeContext } from '../../context/useStore'
import { Product } from '../../types/product'

const RecentlyViewed = () => {
	const [recentProducts, setRecentProducts] = useState<Product[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const { addToCart } = useContext(storeContext)

	useEffect(() => {
		// Cargar productos recientes del localStorage
		const recent = localStorage.getItem('recentlyViewed')
		if (recent) {
			setRecentProducts(JSON.parse(recent))
		}
	}, [])

	if (recentProducts.length === 0) return null

	return (
		<div className='fixed bottom-4 right-4 z-40'>
			{/* Botón para mostrar/ocultar */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='bg-indigo-600 text-white p-3 rounded-full shadow-lg'
			>
				{isOpen ? (
					<FaTimes />
				) : (
					<span>Vistos recientemente ({recentProducts.length})</span>
				)}
			</button>

			{/* Panel emergente */}
			{isOpen && (
				<div className='absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-xl p-4 border border-gray-200'>
					<h3 className='text-lg font-bold text-gray-800 mb-3'>
						Vistos recientemente
					</h3>
					<div className='space-y-3 max-h-80 overflow-y-auto'>
						{recentProducts.map(product => (
							<div
								key={product.id}
								className='flex items-center gap-2 p-2 hover:bg-gray-50 rounded'
							>
								<img
									src={product.image}
									alt={product.title}
									className='w-12 h-12 object-contain'
								/>
								<div className='flex-1 min-w-0'>
									<Link
										to={`/product/${product.id}`}
										className='text-sm font-medium text-gray-800 hover:text-indigo-600 truncate block'
									>
										{product.title}
									</Link>
									<span className='text-indigo-600 text-sm font-bold'>
										${product.price.toFixed(2)}
									</span>
								</div>
								<button
									onClick={() => {
										addToCart(product, 1)
										// Opcional: mostrar notificación
									}}
									className='text-indigo-600 hover:text-indigo-800'
									aria-label='Añadir al carrito'
								>
									<FaPlus />
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default RecentlyViewed
