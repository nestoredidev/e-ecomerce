import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface TicketShopProps {
	subtotal: number
	tax: number
	total: number
	isProcessing: boolean
	completePurchase: () => void
	closeModal: () => void
	orderNumber: string
	today: Date
}
function TicketShop({
	subtotal,
	tax,
	total,
	isProcessing,
	completePurchase,
	closeModal,
	orderNumber,
	today,
}: TicketShopProps) {
	return (
		<>
			{/* Datos del pedido */}
			<div className='border-b border-gray-200 pb-4 mb-4'>
				<p className='text-gray-600 mb-1'>Número de Pedido:</p>
				<p className='font-medium'>{orderNumber}</p>
				<p className='text-gray-600 mb-1 mt-3'>Fecha:</p>
				<p className='font-medium'>{today.toLocaleDateString()}</p>
			</div>

			{/* Resumen de productos */}
			<div className='border-b border-gray-200 pb-4 mb-4'>
				<h4 className='font-bold mb-3'>Resumen de Productos</h4>
				<div className='max-h-40 overflow-y-auto mb-2'>
					{/* Aquí iría un mapeo de los productos en el carrito */}
					<div className='flex justify-between py-1'>
						<span className='text-sm truncate max-w-[200px]'>
							Productos en tu carrito
						</span>
						<span className='text-sm font-medium'>${subtotal.toFixed(2)}</span>
					</div>
				</div>
			</div>

			{/* Totales */}
			<div className='mb-6'>
				<div className='flex justify-between mb-1'>
					<span>Subtotal</span>
					<span>${subtotal.toFixed(2)}</span>
				</div>
				<div className='flex justify-between mb-1'>
					<span>Impuestos (19%)</span>
					<span>${tax.toFixed(2)}</span>
				</div>
				<div className='flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-200'>
					<span>Total</span>
					<span className='text-indigo-600'>${total.toFixed(2)}</span>
				</div>
			</div>

			{/* Botones de acción */}
			<div className='flex flex-col gap-3'>
				<button
					onClick={completePurchase}
					disabled={isProcessing}
					className={`button-keyboard w-full py-3 px-4 rounded-md font-medium 
                                ${
																	isProcessing
																		? 'bg-gray-300 text-gray-500 cursor-not-allowed'
																		: 'bg-indigo-600 text-white hover:bg-indigo-700'
																} transition-colors`}
				>
					{isProcessing ? (
						<span className='flex items-center justify-center'>
							<AiOutlineLoading3Quarters className='animate-spin -ml-1 mr-2 h-4 w-4 text-shadow-blue-600 text-amber-300 ease-in-out transition duration-200s' />
							Procesando...
						</span>
					) : (
						'Confirmar Compra'
					)}
				</button>
				<button
					onClick={closeModal}
					disabled={isProcessing}
					className='button-keyboard py-2 px-4 border border-gray-300 rounded-md text-gray-600 font-medium hover:bg-gray-50 transition-colors'
				>
					Cancelar
				</button>
			</div>
		</>
	)
}

export default TicketShop
