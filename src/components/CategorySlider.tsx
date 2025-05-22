import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Category } from '../types/product'

interface CategorySliderProps {
	categories: Category[] | undefined
}

function CategorySlider({ categories = [] }: CategorySliderProps) {
	const sliderRef = useRef<HTMLDivElement>(null)
	const [showLeftArrow, setShowLeftArrow] = useState(false)
	const [showRightArrow, setShowRightArrow] = useState(true)

	// Comprobar si se pueden mostrar flechas de navegación
	const checkArrows = () => {
		if (!sliderRef.current) return

		const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
		setShowLeftArrow(scrollLeft > 0)
		setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
	}

	useEffect(() => {
		checkArrows()
		window.addEventListener('resize', checkArrows)
		return () => window.removeEventListener('resize', checkArrows)
	}, [])

	console.log('Categories:', categories)
	// Verificar flechas al cargar el componente

	// También verificar cuando cambian las categorías
	useEffect(() => {
		checkArrows()
	}, [categories])

	const scroll = (direction: 'left' | 'right') => {
		if (!sliderRef.current) return

		const scrollAmount = direction === 'left' ? -300 : 300
		sliderRef.current.scrollBy({
			left: scrollAmount,
			behavior: 'smooth',
		})

		// Actualizar flechas después de desplazamiento
		setTimeout(checkArrows, 300)
	}

	// Si no hay categorías, mostrar un placeholder
	if (!categories || categories.length === 0) {
		return (
			<div className='relative mb-12 px-4'>
				<h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
					Categorías populares
				</h2>
				<div className='flex overflow-x-auto scrollbar-hide gap-4 pb-4 pt-2'>
					{/* Mostrar placeholders */}
					{[1, 2, 3, 4, 5].map(item => (
						<div
							key={item}
							className='flex-shrink-0 w-[180px] rounded-lg overflow-hidden shadow-md bg-gray-100 animate-pulse'
						>
							<div className='h-[180px] bg-gray-200'></div>
							<div className='p-3 bg-white'>
								<div className='h-6 bg-gray-200 rounded w-3/4 mx-auto'></div>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className='relative mb-12 px-4'>
			<h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
				Categorías populares
			</h2>

			{/* Botón izquierda */}
			{showLeftArrow && (
				<button
					onClick={() => scroll('left')}
					className='absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200'
					aria-label='Desplazar a la izquierda'
				>
					<FaChevronLeft className='text-gray-700' />
				</button>
			)}

			{/* Contenedor del slider */}
			<div
				ref={sliderRef}
				className='flex overflow-x-auto scrollbar-hide gap-4 pb-4 pt-2'
				onScroll={checkArrows}
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			>
				{categories.map(category => (
					<div
						key={category.id}
						className='w-[180px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'
					>
						<div className='h-[180px] overflow-hidden'>
							<img
								src={category.image || '/no-found.jpg'}
								alt={category.name || 'Categoría'}
								className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
								onError={e => {
									const target = e.target as HTMLImageElement
									target.src = '/no-found.jpg'
								}}
							/>
						</div>
						<div className='p-3 bg-white'>
							<h3 className='text-center font-medium text-gray-800 group-hover:text-indigo-600 transition-colors duration-200'>
								{category.name || 'Categoría sin nombre'}
							</h3>
							{category.count !== undefined && (
								<p className='text-center text-sm text-gray-500'>
									{category.count} productos
								</p>
							)}
						</div>
					</div>
				))}
			</div>

			{/* Botón derecha */}
			{showRightArrow && (
				<button
					onClick={() => scroll('right')}
					className='absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200'
					aria-label='Desplazar a la derecha'
				>
					<FaChevronRight className='text-gray-700' />
				</button>
			)}
		</div>
	)
}

export default CategorySlider
