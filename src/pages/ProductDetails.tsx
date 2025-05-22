import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaCheckCircle, FaMinus, FaPlus, FaStar } from 'react-icons/fa'
import Layout from '../components/Layout'
import { storeContext } from '../context/useStore'

function ProductDetails() {
	const { id } = useParams<{ id: string }>()
	const {
		fechUniqueProdcut,
		uniqueProdcut: product,
		loading,
		addToCart,
	} = useContext(storeContext)
	const [error, setError] = useState(false)
	const [addedToCart, setAddedToCart] = useState(false)
	const [quantity, setQuantity] = useState(1)

	useEffect(() => {
		const loadProduct = async () => {
			try {
				if (id) {
					await fechUniqueProdcut(id)
				} else {
					setError(true)
				}
			} catch (err) {
				console.error('Error cargando el producto:', err)
				setError(true)
			}
		}

		loadProduct()
		// Resetear estados cuando cambia el ID
		setAddedToCart(false)
		setQuantity(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	const handleAddToCart = () => {
		if (product) {
			addToCart(product, quantity)
			setAddedToCart(true)

			// Feedback visual temporal
			setTimeout(() => {
				setAddedToCart(false)
			}, 3000)
		}
	}

	const incrementQuantity = () => {
		setQuantity(prev => prev + 1)
	}

	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity(prev => prev - 1)
		}
	}

	// Mostrar un mensaje de error si no se encuentra el producto
	if (error) {
		return (
			<Layout>
				<div className='container mx-auto px-4 py-8 text-center'>
					<h1 className='text-2xl font-bold text-red-600 mb-4'>
						Producto no encontrado
					</h1>
					<p className='text-gray-600'>
						No pudimos encontrar el producto solicitado. Por favor, intenta con
						otro.
					</p>
				</div>
			</Layout>
		)
	}

	// Mostrar un loader mientras se carga el producto
	if (loading || !product) {
		return (
			<Layout>
				<div className='container mx-auto px-4 py-8'>
					<div className='bg-white rounded-lg shadow-md overflow-hidden animate-pulse'>
						<div className='md:flex'>
							<div className='md:w-1/2 bg-gray-200 h-96'></div>
							<div className='md:w-1/2 p-8'>
								<div className='h-8 bg-gray-200 w-3/4 mb-4'></div>
								<div className='h-4 bg-gray-200 w-1/2 mb-4'></div>
								<div className='h-4 bg-gray-200 w-full mb-2'></div>
								<div className='h-4 bg-gray-200 w-full mb-2'></div>
								<div className='h-4 bg-gray-200 w-3/4 mb-8'></div>
								<div className='h-10 bg-gray-200 w-1/3 mb-4'></div>
								<div className='h-12 bg-gray-200 w-full'></div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<div className='container mx-auto px-4 py-8'>
				{/* Navegación de migas de pan */}
				<div className='text-sm text-gray-500 mb-6'>
					<span className='hover:text-indigo-600 cursor-pointer'>Inicio</span>{' '}
					&gt;{' '}
					<span className='hover:text-indigo-600 cursor-pointer'>
						{product.category}
					</span>{' '}
					&gt; <span className='text-gray-800'>{product.title}</span>
				</div>

				<div className='bg-white rounded-lg shadow-md overflow-hidden'>
					<div className='md:flex'>
						{/* Imagen del producto */}
						<div className='md:w-1/2 flex justify-center items-center p-8 bg-white'>
							<img
								src={product.image}
								alt={product.title}
								className='max-h-96 object-contain'
							/>
						</div>

						{/* Información del producto */}
						<div className='md:w-1/2 p-6 md:p-8'>
							<div className='flex flex-col h-full justify-between'>
								<div>
									<h1 className='text-2xl font-bold text-gray-800 mb-2'>
										{product.title}
									</h1>

									{/* Calificación */}
									<div className='flex items-center mb-4'>
										<div className='flex text-yellow-400'>
											{[...Array(5)].map((_, i) => (
												<FaStar
													key={i}
													className={
														i < Math.round(product.rating?.rate || 0)
															? 'text-yellow-400'
															: 'text-gray-300'
													}
												/>
											))}
										</div>
										<span className='text-gray-600 ml-2'>
											{product.rating?.rate} ({product.rating?.count} reseñas)
										</span>
									</div>

									{/* Precio */}
									<div className='text-2xl font-bold text-indigo-600 mb-4'>
										${product.price?.toFixed(2)}
									</div>

									{/* Descripción */}
									<div className='text-gray-600 mb-8'>
										{product.description}
									</div>

									{/* Categoría */}
									<div className='mb-6'>
										<span className='text-gray-700'>Categoría: </span>
										<span className='bg-gray-100 text-indigo-600 px-2 py-1 rounded text-sm'>
											{product.category}
										</span>
									</div>
								</div>

								<div className='mt-8'>
									{/* Selector de cantidad */}
									<div className='flex items-center mb-4'>
										<span className='text-gray-700 mr-3'>Cantidad:</span>
										<div className='flex items-center border border-gray-300 rounded-md'>
											<button
												onClick={decrementQuantity}
												disabled={quantity <= 1}
												className='px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50'
											>
												<FaMinus />
											</button>
											<span className='px-4 py-1 text-center w-12'>
												{quantity}
											</span>
											<button
												onClick={incrementQuantity}
												className='px-3 py-1 text-gray-600 cursor-pointer transition ease-in-out duration-300 hover:bg-gray-100'
											>
												<FaPlus />
											</button>
										</div>
									</div>

									{/* Botón de añadir al carrito */}
									<button
										onClick={handleAddToCart}
										className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
											addedToCart
												? 'bg-green-600 hover:bg-green-700'
												: 'bg-indigo-600 hover:bg-indigo-700'
										}`}
									>
										{addedToCart ? (
											<span className='flex items-center justify-center'>
												<FaCheckCircle className='mr-2' />
												¡Añadido al carrito!
											</span>
										) : (
											'Añadir al carrito'
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default ProductDetails
