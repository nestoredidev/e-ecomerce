import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../types/product'
import { FaCheckCircle, FaShoppingCart } from 'react-icons/fa'
// Adjust the import path as needed

interface CardProductProps {
	id: number
	title: string
	price: number
	image: string
	addToCart?: (product: Product, quantity?: number) => void
}

const CardProduct = ({
	id,
	title,
	price,
	image,
	addToCart,
}: CardProductProps) => {
	const [added, setAdded] = useState(false)

	const product: Product = {
		id,
		title,
		price,
		image,
		description: '',
		category: '',
		rating: { rate: 0, count: 0 },
	}

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault() // Prevenir navegación al hacer clic en el botón

		if (addToCart) {
			addToCart(product, 1)

			// Feedback visual
			setAdded(true)
			setTimeout(() => setAdded(false), 2000)
		}
	}

	return (
		<Link to={`/product/${id}`} className='group'>
			<div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-5px] hover:shadow-lg'>
				{/* Imagen */}
				<div className='h-48 p-4 flex items-center justify-center bg-white'>
					<img
						src={image}
						alt={title}
						className='h-full object-contain group-hover:scale-105 transition-transform'
					/>
				</div>

				{/* Contenido */}
				<div className='p-4 border-t'>
					<h3 className='text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[40px]'>
						{title}
					</h3>

					<div className='flex justify-between items-center'>
						<span className='text-lg font-bold text-indigo-600'>
							${price.toFixed(2)}
						</span>

						{addToCart && (
							<button
								onClick={handleAddToCart}
								className={`p-2 rounded-full ${
									added ? 'bg-green-600' : 'bg-indigo-600'
								} text-white hover:opacity-90 transition-colors`}
								aria-label='Añadir al carrito'
							>
								{added ? <FaCheckCircle /> : <FaShoppingCart />}
							</button>
						)}
					</div>
				</div>
			</div>
		</Link>
	)
}

export default CardProduct
