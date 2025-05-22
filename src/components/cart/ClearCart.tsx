interface ClearCartProps {
	subtotal: number
	clearCart: () => void
}
function ClearCart({ subtotal, clearCart }: ClearCartProps) {
	return (
		<div className='px-4 sm:px-6 py-4 bg-gray-50 flex flex-wrap sm:flex-nowrap justify-between items-center'>
			<button
				onClick={clearCart}
				className='text-xs sm:text-sm text-red-600 hover:text-red-900 mb-2 sm:mb-0 w-full sm:w-auto text-center sm:text-left'
			>
				Vaciar carrito
			</button>
			<div className='md:hidden text-xs sm:text-sm font-medium w-full sm:w-auto text-center sm:text-right'>
				<span className='text-gray-600'>Subtotal:</span>{' '}
				<span className='text-indigo-600 font-bold'>
					${subtotal.toFixed(2)}
				</span>
			</div>
		</div>
	)
}

export default ClearCart
