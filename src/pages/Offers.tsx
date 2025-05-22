import { useState, useMemo, useContext, useEffect } from 'react'
import {
	FaFire,
	FaPercentage,
	FaRegClock,
	FaShoppingCart,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Button from '../components/ui/Buttons'
import { storeContext } from '../context/useStore'
import { Product } from '../types/product'

function Offers() {
	const [error, setError] = useState(false)
	const { products, loading, fetchProducts, addToCart } =
		useContext(storeContext)

	// Calcular ofertas utilizando useMemo para evitar recálculos innecesarios
	const offerProducts = useMemo(() => {
		if (!products.length) return []

		try {
			// Simular ofertas selectivas
			const offers = products.filter((_, index) => index % 2 === 0)

			// Agregar un descuento simulado entre 10% y 40%
			return offers.map(product => {
				const discountPercent = Math.floor(Math.random() * 31) + 10
				const originalPrice = product.price
				const discountedPrice = Math.round(
					originalPrice * (1 - discountPercent / 100)
				)

				return {
					...product,
					originalPrice: originalPrice,
					price: discountedPrice,
					discountPercent,
				} as Product
			})
		} catch (err) {
			console.error('Error processing offers:', err)
			setError(true)
			return []
		}
	}, [products])

	// Calcular tiempo restante para fin de ofertas (simulado)
	const today = new Date()
	const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
	const daysRemaining = Math.ceil(
		(endOfMonth.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
	)

	useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<Layout>
			<div className='container mx-auto px-4 py-8'>
				{/* Banner de ofertas */}
				<div className='bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-6 md:p-10 mb-10 text-white'>
					<div className='max-w-4xl mx-auto'>
						<div className='flex items-center mb-4'>
							<FaFire className='text-yellow-300 text-3xl mr-3' />
							<h1 className='text-3xl md:text-4xl font-bold'>
								Ofertas Especiales
							</h1>
						</div>
						<p className='text-lg md:text-xl mb-6 text-indigo-100'>
							Aprovecha estos descuentos exclusivos por tiempo limitado
						</p>
						<div className='bg-white/20 rounded-lg p-4 backdrop-blur-sm inline-flex items-center'>
							<FaRegClock className='text-xl mr-2' />
							<span className='font-bold'>
								¡Solo {daysRemaining} días más! Ofertas válidas hasta fin de mes
							</span>
						</div>
					</div>
				</div>

				{loading ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{[...Array(8)].map((_, i) => (
							<div
								key={i}
								className='bg-white rounded-lg shadow-md overflow-hidden h-96 animate-pulse'
							>
								<div className='bg-gray-200 h-52 w-full'></div>
								<div className='p-4'>
									<div className='h-4 bg-gray-200 rounded w-3/4 mb-4'></div>
									<div className='h-4 bg-gray-200 rounded w-1/2 mb-4'></div>
									<div className='h-8 bg-gray-200 rounded w-1/3 mb-2'></div>
									<div className='h-10 bg-gray-200 rounded w-full mt-6'></div>
								</div>
							</div>
						))}
					</div>
				) : error ? (
					<div className='text-center py-12'>
						<h2 className='text-2xl font-bold text-gray-800 mb-4'>
							Oops! Algo salió mal
						</h2>
						<p className='text-gray-600 mb-6'>
							No pudimos cargar las ofertas en este momento. Por favor, intenta
							nuevamente más tarde.
						</p>
						<Button variant='primary' onClick={() => window.location.reload()}>
							Reintentar
						</Button>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{offerProducts.map(product => (
							<div
								key={product.id}
								className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full'
							>
								{/* Badge de descuento */}
								<div className='relative pt-[100%]'>
									<div className='absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg font-bold flex items-center z-10'>
										<FaPercentage className='mr-1' />
										{product.discountPercent} % OFF
									</div>
									<img
										src={product.image}
										alt={product.title}
										className='absolute top-0 left-0 w-full h-full object-contain bg-white p-4'
										onError={e => {
											const target = e.target as HTMLImageElement
											target.src = '/no-found.jpg'
										}}
									/>
								</div>

								<div className='p-4 flex flex-col flex-grow'>
									<Link
										to={`/product/${product.id}`}
										className='block h-12 mb-2 overflow-hidden'
									>
										<h2 className='text-base font-semibold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-2'>
											{product.title}
										</h2>
									</Link>

									<div className='flex items-center mb-2'>
										<span className='text-xl font-bold text-indigo-600'>
											${product.price.toFixed(2)}
										</span>
										<span className='ml-2 text-gray-500 line-through text-sm'>
											${product.originalPrice?.toFixed(2)}
										</span>
									</div>

									<div className='flex items-center mb-2 text-xs text-gray-600'>
										<span className='capitalize truncate max-w-[120px]'>
											{product.category}
										</span>
										<span className='mx-2'>•</span>
										<span className='flex items-center'>
											{product.rating.rate} ★ ({product.rating.count})
										</span>
									</div>

									<p className='text-gray-600 text-xs mb-4 line-clamp-3 h-12'>
										{product.description}
									</p>

									<div className='mt-auto'>
										<Button
											onClick={() => addToCart(product, 1)}
											variant='primary'
											fullWidth
											rightIcon={<FaShoppingCart />}
										>
											Agregar
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Banner informativo */}
				<div className='mt-12 bg-indigo-50 border border-indigo-100 rounded-lg p-6 text-center'>
					<h3 className='text-xl font-semibold text-indigo-800 mb-2'>
						¿Cómo funcionan nuestras ofertas?
					</h3>
					<p className='text-indigo-700'>
						Los productos en oferta tienen un descuento temporal sobre su precio
						original. Las ofertas están disponibles hasta fin de mes o hasta
						agotar existencias.
					</p>
				</div>
			</div>
		</Layout>
	)
}

export default Offers
