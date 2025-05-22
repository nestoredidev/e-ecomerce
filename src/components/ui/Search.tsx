import React, { useState, useEffect, useRef, useContext } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { storeContext } from '../../context/useStore'
import { Product } from '../../types/product'

type SearchProps = {
	placeholder?: string
	onSearch?: (query: string) => void
	className?: string
	maxResults?: number
}

function Search({
	placeholder = 'Buscar productos...',
	onSearch,
	className = '',
	maxResults = 5,
}: SearchProps) {
	const { products, fetchProducts } = useContext(storeContext)
	const [query, setQuery] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [results, setResults] = useState<Product[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const searchRef = useRef<HTMLDivElement>(null)
	const navigate = useNavigate()

	// Cargar productos si no están cargados ya (solo al montar)
	useEffect(() => {
		if (products.length === 0) {
			const loadProducts = async () => {
				try {
					setIsLoading(true)
					await fetchProducts()
				} catch (error) {
					console.error('Error cargando productos:', error)
				} finally {
					setIsLoading(false)
				}
			}

			loadProducts()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // Solo al montar

	// Filtrar productos cuando cambia la consulta
	useEffect(() => {
		if (query.trim() === '') {
			setResults([])
			return
		}

		const timer = setTimeout(() => {
			const filteredResults = products
				.filter(product => {
					return (
						product.title.toLowerCase().includes(query.toLowerCase()) ||
						product.description.toLowerCase().includes(query.toLowerCase()) ||
						(typeof product.category === 'string' &&
							product.category.toLowerCase().includes(query.toLowerCase()))
					)
				})
				.slice(0, maxResults)

			setResults(filteredResults)
		}, 300)

		return () => clearTimeout(timer)
	}, [query, products, maxResults])

	// Cerrar resultados al hacer clic fuera del componente
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setQuery(value)
		setIsOpen(value.trim() !== '')
		if (onSearch) onSearch(value)
	}

	// Simplificado: Solo navegar al producto
	const handleSelectProduct = (product: Product) => {
		if (product && product.id) {
			// Navegar directamente a la página del producto
			navigate(`/product/${product.id}`)
			setIsOpen(false)
			setQuery('') // Limpiar la búsqueda después de seleccionar
		}
	}

	return (
		<div ref={searchRef} className={`relative ${className}`}>
			<div className='relative'>
				<input
					type='text'
					value={query}
					onChange={handleInputChange}
					placeholder={placeholder}
					className='w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
				/>
				<div className='absolute inset-y-0 right-0 flex items-center pr-3'>
					<FaSearch className='text-gray-400' />
				</div>
			</div>

			{isOpen && (
				<div className='absolute mt-1 w-full bg-white rounded-md shadow-lg overflow-hidden z-10'>
					{isLoading ? (
						<div className='px-4 py-3 text-sm text-gray-500'>Cargando...</div>
					) : results.length > 0 ? (
						<ul>
							{results.map(product => (
								<li
									key={product.id}
									onClick={() => handleSelectProduct(product)}
									className='px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100'
								>
									<div className='flex items-center'>
										<div className='w-10 h-10 flex-shrink-0 mr-3'>
											<img
												src={product.image}
												alt={product.title}
												className='w-full h-full object-contain'
												onError={e => {
													const target = e.target as HTMLImageElement
													target.src = '/no-found.jpg'
												}}
											/>
										</div>
										<div className='flex-1 min-w-0'>
											<p className='text-sm font-medium text-gray-800 truncate'>
												{product.title}
											</p>
											<p className='text-xs text-gray-500'>
												${product.price?.toFixed(2)}
											</p>
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						query.trim() !== '' && (
							<div className='px-4 py-3 text-sm text-gray-500'>
								No se encontraron resultados
							</div>
						)
					)}
				</div>
			)}
		</div>
	)
}

export default Search
