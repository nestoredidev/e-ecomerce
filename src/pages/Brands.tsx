import { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import CardProduct from '../components/CardProduct'
import Filters from '../components/Filters'
import Layout from '../components/Layout'
import { Category, Product } from '../types/product'
import { storeContext } from '../context/useStore'

function Brands() {
	const {
		products,
		fetchProducts,
		productCategory,
		addToCart,
		fechProductCategory,
		loading: contextLoading,
	} = useContext(storeContext)
	const [categoryProduct, setCategoryProduct] = useState<Category[]>([])
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]) // Cambiado de number[] a string[]
	const [searchQuery, setSearchQuery] = useState('')
	const [expandedSections, setExpandedSections] = useState({
		price: true,
		brands: true,
	})

	// Añade estos estados para manejar la paginación
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(9) // 9 productos por página (3x3 grid)

	// Cargar productos y categorías al iniciar
	useEffect(() => {
		// Envuelve las llamadas en una función anónima para evitar dependencias
		const loadData = async () => {
			await fetchProducts()
			await fechProductCategory()
		}

		loadData()
		// Usa un array vacío para que solo se ejecute al montar el componente
	}, [])

	// Actualizar productos filtrados cuando cambian los productos del contexto
	useEffect(() => {
		// Cuando los productos cambian, actualiza los filtrados y el loading
		if (products.length > 0) {
			setFilteredProducts(products)
			setLoading(false)
		}
	}, [products])

	// Actualizar el estado de categorías cuando se cargan del contexto
	useEffect(() => {
		if (productCategory.length > 0) {
			setCategoryProduct(productCategory)
		}
	}, [productCategory])

	// Función para cambiar de página
	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber)
		// Hacer scroll al inicio de los resultados cuando se cambia de página
		window.scrollTo({
			top: document.getElementById('products-section')?.offsetTop || 0,
			behavior: 'smooth',
		})
	}

	// Calcula el total de páginas
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

	// Productos para la página actual
	const currentProducts = filteredProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	// Aplicar los filtros cuando cambien los criterios o al hacer clic en "Aplicar filtros"
	const applyFilters = () => {
		let result = [...products]

		// Filtrar por precio
		result = result.filter(
			product =>
				product.price >= priceRange[0] && product.price <= priceRange[1]
		)

		// Filtrar por categorías seleccionadas
		if (selectedCategories.length > 0) {
			result = result.filter(product => {
				// En Fake Store API, las categorías son strings como "electronics", "jewelery", etc.
				// Por lo tanto, necesitamos hacer una comparación adecuada

				if (typeof product.category === 'string') {
					// Verificar si la categoría del producto está en las categorías seleccionadas
					return selectedCategories.includes(product.category)
				}
				return false
			})
		}

		// Filtrar por búsqueda
		if (searchQuery.trim() !== '') {
			const query = searchQuery.toLowerCase()
			result = result.filter(
				product =>
					product.title.toLowerCase().includes(query) ||
					product.description.toLowerCase().includes(query)
			)
		}

		// Actualizar los productos filtrados
		setFilteredProducts(result)
		// Resetear a la primera página cuando se aplican nuevos filtros
		setCurrentPage(1)
	}

	// Expandir/contraer secciones
	const toggleSection = (section: 'price' | 'brands') => {
		setExpandedSections({
			...expandedSections,
			[section]: !expandedSections[section],
		})
	}

	// Manejar selección de categorías
	const handleCategoryToggle = (categoryId: string) => {
		setSelectedCategories(prev =>
			prev.includes(categoryId)
				? prev.filter(id => id !== categoryId)
				: [...prev, categoryId]
		)
	}

	// Manejar cambios en el rango de precios
	const handlePriceChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const newValue = parseInt(e.target.value)
		setPriceRange(prev => {
			const newRange = [...prev] as [number, number]
			newRange[index] = newValue
			return newRange
		})
	}

	// Buscar categorías
	const [categorySearchQuery, setCategorySearchQuery] = useState('')
	const filteredCategories = categoryProduct.filter(cat =>
		cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase())
	)

	// Resetear todos los filtros
	const handleReset = () => {
		setPriceRange([0, 1000])
		setSelectedCategories([])
		setSearchQuery('')
		setCategorySearchQuery('')
		setFilteredProducts(products)
	}

	// Utilizar el estado de carga del contexto o el estado local
	const isLoading = loading || contextLoading

	return (
		<Layout>
			<div className='container mx-auto px-4 py-8'>
				<h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
					Explorar por Marcas y Categorías
				</h1>

				{/* Búsqueda principal */}
				<div className='relative max-w-3xl mx-auto mb-8'>
					<input
						type='text'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder='Buscar productos...'
						className='w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
					/>
					<FaSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg' />
					<button
						onClick={applyFilters}
						className='absolute right-3 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 transition-colors'
					>
						Buscar
					</button>
				</div>

				<div className='flex flex-col md:flex-row gap-6'>
					{/* Filtros */}
					<Filters
						applyFilters={applyFilters}
						categorySearchQuery={categorySearchQuery}
						expandedSections={expandedSections}
						filteredCategories={filteredCategories}
						handleCategoryToggle={handleCategoryToggle}
						handlePriceChange={handlePriceChange}
						loading={isLoading}
						handleReset={handleReset}
						priceRange={priceRange}
						selectedCategories={selectedCategories}
						setCategorySearchQuery={setCategorySearchQuery}
						setSelectedCategories={setSelectedCategories}
						setPriceRange={setPriceRange}
						toggleSection={toggleSection}
					/>

					{/* Contenido principal - Lista de productos */}
					<section
						id='products-section'
						className='flex-1 bg-white rounded-lg shadow-md p-6'
					>
						<div className='flex justify-between items-center mb-6'>
							<h2 className='text-xl font-bold text-gray-800'>
								Productos{' '}
								{filteredProducts.length > 0
									? `(${filteredProducts.length})`
									: ''}
							</h2>

							{/* Selector de ordenamiento */}
							<select
								className='border border-gray-300 rounded p-2 text-sm'
								onChange={e => {
									const value = e.target.value
									const sorted = [...filteredProducts]

									if (value === 'price-asc') {
										sorted.sort((a, b) => a.price - b.price)
									} else if (value === 'price-desc') {
										sorted.sort((a, b) => b.price - a.price)
									} else if (value === 'name-asc') {
										sorted.sort((a, b) => a.title.localeCompare(b.title))
									} else if (value === 'name-desc') {
										sorted.sort((a, b) => b.title.localeCompare(a.title))
									}

									setFilteredProducts(sorted)
									setCurrentPage(1) // Regresar a la primera página al ordenar
								}}
							>
								<option value=''>Ordenar por</option>
								<option value='price-asc'>Precio: menor a mayor</option>
								<option value='price-desc'>Precio: mayor a menor</option>
								<option value='name-asc'>Nombre: A-Z</option>
								<option value='name-desc'>Nombre: Z-A</option>
							</select>
						</div>

						{isLoading ? (
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
								{[...Array(itemsPerPage)].map((_, i) => (
									<div
										key={i}
										className='bg-gray-100 h-64 rounded-lg animate-pulse'
									></div>
								))}
							</div>
						) : filteredProducts.length > 0 ? (
							<>
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
									{currentProducts.map(product => (
										<CardProduct
											key={product.id}
											id={product.id}
											title={product.title}
											price={product.price}
											image={product.image}
											addToCart={addToCart}
										/>
									))}
								</div>

								{/* Información de paginación */}
								{filteredProducts.length > itemsPerPage && (
									<div className='text-sm text-gray-600 text-center mb-4'>
										Mostrando{' '}
										{Math.min(
											itemsPerPage,
											filteredProducts.length - (currentPage - 1) * itemsPerPage
										)}{' '}
										de {filteredProducts.length} productos
									</div>
								)}
							</>
						) : (
							<div className='text-center py-8'>
								<p className='text-gray-600 mb-4'>
									No se encontraron productos que coincidan con tus filtros.
								</p>
								<button
									onClick={handleReset}
									className='text-indigo-600 hover:text-indigo-800 font-medium'
								>
									Limpiar filtros
								</button>
							</div>
						)}

						{/* Paginación - solo mostrar si hay más de una página */}
						{totalPages > 1 && (
							<div className='flex justify-center mt-8'>
								<nav className='flex items-center gap-1'>
									<button
										onClick={() => currentPage > 1 && paginate(currentPage - 1)}
										disabled={currentPage === 1}
										className={`px-3 py-1 rounded border ${
											currentPage === 1
												? 'border-gray-200 text-gray-400 cursor-not-allowed'
												: 'border-gray-300 text-gray-700 hover:bg-gray-50'
										}`}
									>
										Anterior
									</button>

									{/* Generar botones de página de manera dinámica */}
									{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
										// Lógica para mostrar las páginas correctas cuando hay muchas
										let pageNum: number

										if (totalPages <= 5) {
											// Si hay 5 o menos páginas, mostrar todas
											pageNum = i + 1
										} else if (currentPage <= 3) {
											// Si estamos en las primeras páginas
											pageNum = i + 1
										} else if (currentPage >= totalPages - 2) {
											// Si estamos en las últimas páginas
											pageNum = totalPages - 4 + i
										} else {
											// Estamos en el medio, mostrar la página actual en el centro
											pageNum = currentPage - 2 + i
										}

										return (
											<button
												key={i}
												onClick={() => paginate(pageNum)}
												className={`px-3 py-1 rounded ${
													currentPage === pageNum
														? 'bg-indigo-600 text-white'
														: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
												}`}
											>
												{pageNum}
											</button>
										)
									})}

									<button
										onClick={() =>
											currentPage < totalPages && paginate(currentPage + 1)
										}
										disabled={currentPage === totalPages}
										className={`px-3 py-1  rounded border ${
											currentPage === totalPages
												? 'border-gray-200 text-gray-400 cursor-not-allowed'
												: 'border-gray-300 text-gray-700 hover:bg-gray-50'
										}`}
									>
										Siguiente
									</button>
								</nav>
							</div>
						)}
					</section>
				</div>
			</div>
		</Layout>
	)
}

export default Brands
