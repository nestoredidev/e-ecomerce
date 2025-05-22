import { useContext, useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { storeContext } from '../context/useStore'
import Layout from '../components/Layout'
import CardProduct from '../components/CardProduct'
import { Product } from '../types/product'

function SearchResults() {
	const [searchParams] = useSearchParams()
	const query = searchParams.get('q') || ''
	const { products, fetchProducts, loading } = useContext(storeContext)
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
	const [isLoading, setIsLoading] = useState(true)

	// Cargar productos si es necesario (solo al montar)
	useEffect(() => {
		const loadData = async () => {
			if (products.length === 0) {
				try {
					setIsLoading(true)
					await fetchProducts()
				} catch (error) {
					console.error('Error cargando productos:', error)
				} finally {
					setIsLoading(false)
				}
			} else {
				setIsLoading(false)
			}
		}

		loadData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // Solo se ejecuta al montar

	// Memoizar la función de filtrado para evitar recreaciones innecesarias
	const filterProducts = useCallback(() => {
		if (!query || query.trim() === '') {
			return []
		}

		const searchTerms = query
			.toLowerCase()
			.split(' ')
			.filter(term => term)

		return products.filter(product => {
			// Buscar en título, descripción y categoría
			const titleMatches = product.title
				.toLowerCase()
				.includes(query.toLowerCase())
			const descriptionMatches = product.description
				.toLowerCase()
				.includes(query.toLowerCase())
			const categoryMatches =
				typeof product.category === 'string' &&
				product.category.toLowerCase().includes(query.toLowerCase())

			// Buscar términos individuales para mayor flexibilidad
			const termMatches = searchTerms.some(
				term =>
					product.title.toLowerCase().includes(term) ||
					product.description.toLowerCase().includes(term) ||
					(typeof product.category === 'string' &&
						product.category.toLowerCase().includes(term))
			)

			return (
				titleMatches || descriptionMatches || categoryMatches || termMatches
			)
		})
	}, [query, products])

	// Filtrar productos cuando cambia la consulta o los productos
	useEffect(() => {
		const results = filterProducts()
		setFilteredProducts(results)
	}, [filterProducts])

	return (
		<Layout>
			<div className='container mx-auto px-4 py-8'>
				<h1 className='text-2xl font-bold text-gray-800 mb-6'>
					Resultados de búsqueda: {query}
				</h1>

				{isLoading || loading ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{[...Array(8)].map((_, i) => (
							<div
								key={i}
								className='bg-gray-100 h-64 rounded-lg animate-pulse'
							></div>
						))}
					</div>
				) : filteredProducts.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{filteredProducts.map(product => (
							<CardProduct
								key={product.id}
								id={product.id}
								title={product.title}
								price={product.price}
								image={product.image}
							/>
						))}
					</div>
				) : (
					<div className='text-center py-10'>
						<p className='text-gray-600 mb-4'>
							No se encontraron productos que coincidan con "{query}"
						</p>
						<p className='text-gray-500'>
							Intenta con otras palabras o navega por nuestras categorías
						</p>
					</div>
				)}
			</div>
		</Layout>
	)
}

export default SearchResults
