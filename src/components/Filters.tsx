import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa'
import { Category } from '../types/product'

interface FiltersProps {
	loading: boolean
	selectedCategories: string[]
	setSelectedCategories: (categories: string[]) => void
	priceRange: number[]
	setPriceRange: (range: [number, number]) => void
	applyFilters: () => void
	handleReset: () => void
	categorySearchQuery: string
	setCategorySearchQuery: (query: string) => void
	handlePriceChange: (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => void
	handleCategoryToggle: (categoryId: string) => void
	toggleSection: (section: 'price' | 'brands') => void
	expandedSections: {
		price: boolean
		brands: boolean
	}
	filteredCategories: Category[]
}
function Filters({
	loading,
	selectedCategories,
	priceRange,
	applyFilters,
	handleReset,
	categorySearchQuery,
	setCategorySearchQuery,
	handlePriceChange,
	handleCategoryToggle,
	toggleSection,
	filteredCategories,
	expandedSections,
}: FiltersProps) {
	return (
		<aside className='md:w-80 bg-white rounded-lg shadow-md p-4 h-fit'>
			<div className='flex justify-between items-center mb-6'>
				<span className='text-xl font-bold text-gray-800'>Filtros</span>
				<button
					onClick={handleReset}
					className='text-sm text-indigo-600 hover:text-indigo-800 font-medium'
				>
					Limpiar filtros
				</button>
			</div>

			{/* Filtro de precio */}
			<div className='mb-6 border-b border-gray-200 pb-6'>
				<div
					className='flex justify-between items-center cursor-pointer mb-4'
					onClick={() => toggleSection('price')}
				>
					<span className='text-lg font-semibold text-gray-700'>Precio</span>
					{expandedSections.price ? (
						<FaChevronUp className='text-gray-500' />
					) : (
						<FaChevronDown className='text-gray-500' />
					)}
				</div>

				{expandedSections.price && (
					<div className='space-y-4'>
						<div className='flex justify-between items-center'>
							<span className='text-sm text-gray-600'>
								Min: ${priceRange[0]}
							</span>
							<span className='text-sm text-gray-600'>
								Max: ${priceRange[1]}
							</span>
						</div>

						<input
							type='range'
							min='0'
							max='1000'
							value={priceRange[0]}
							onChange={e => handlePriceChange(e, 0)}
							className='w-full accent-indigo-600'
						/>

						<input
							type='range'
							min='0'
							max='1000'
							value={priceRange[1]}
							onChange={e => handlePriceChange(e, 1)}
							className='w-full accent-indigo-600'
						/>

						<div className='flex gap-3 mt-2'>
							<div className='flex-1'>
								<input
									type='number'
									value={priceRange[0]}
									onChange={e => handlePriceChange(e, 0)}
									min='0'
									max={priceRange[1]}
									className='w-full p-2 border border-gray-300 rounded text-sm'
								/>
							</div>
							<div className='flex-1'>
								<input
									type='number'
									value={priceRange[1]}
									onChange={e => handlePriceChange(e, 1)}
									min={priceRange[0]}
									max='1000'
									className='w-full p-2 border border-gray-300 rounded text-sm'
								/>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Filtro de categorías */}
			<div className='mb-4'>
				<div
					className='flex justify-between items-center cursor-pointer mb-4'
					onClick={() => toggleSection('brands')}
				>
					<span className='text-lg font-semibold text-gray-700'>
						Categorías
					</span>
					{expandedSections.brands ? (
						<FaChevronUp className='text-gray-500' />
					) : (
						<FaChevronDown className='text-gray-500' />
					)}
				</div>

				{expandedSections.brands && (
					<div>
						<div className='relative mb-4'>
							<input
								type='text'
								value={categorySearchQuery}
								onChange={e => setCategorySearchQuery(e.target.value)}
								placeholder='Buscar categoría...'
								className='w-full p-2 pl-8 border border-gray-300 rounded text-sm'
							/>
							<FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
						</div>

						{loading ? (
							<div className='animate-pulse text-gray-500 text-sm'>
								Cargando categorías...
							</div>
						) : (
							<div className='max-h-56 overflow-y-auto pr-2 space-y-2'>
								{filteredCategories.map((cat: Category) => (
									<div key={cat.id} className='flex items-center'>
										<label className='flex items-center cursor-pointer'>
											<input
												type='checkbox'
												checked={selectedCategories.includes(cat.id)}
												onChange={() => handleCategoryToggle(cat.id)}
												className='rounded border-gray-300 text-indigo-600 mr-2 focus:ring-indigo-500'
											/>
											<div className='flex items-center gap-2'>
												<img
													src={cat.image || 'no-found.jpg'}
													alt={cat.name}
													className='w-6 h-6 rounded-full object-cover'
												/>
												<span className='text-sm font-medium text-gray-700'>
													{cat.name}
												</span>
											</div>
										</label>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>

			{/* Botón de aplicar filtros */}
			<button
				onClick={applyFilters}
				className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200'
			>
				Aplicar filtros
			</button>
		</aside>
	)
}

export default Filters
