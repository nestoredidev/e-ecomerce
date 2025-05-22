import { useContext, useState } from 'react'
import { FaReceipt, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { storeContext } from '../../context/useStore'
import Modal from '../Modal'
import TicketExit from '../tickets/TicketExit'
import TicketShop from '../tickets/TicketShop'

interface PaymentProps {
	subtotal: number
	tax: number
	total: number
}

function Payment({ subtotal, tax, total }: PaymentProps) {
	const { clearCart } = useContext(storeContext)
	const [showModal, setShowModal] = useState(false)
	const [isProcessing, setIsProcessing] = useState(false)
	const [isPurchased, setIsPurchased] = useState(false)

	const today = new Date()
	const orderNumber = `ORD-${today.getFullYear()}${String(
		today.getMonth() + 1
	).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-${Math.floor(
		Math.random() * 10000
	)
		.toString()
		.padStart(4, '0')}`

	const handlePayment = () => {
		setShowModal(true)
	}

	const closeModal = () => {
		setShowModal(false)
		setIsProcessing(false)
		setIsPurchased(false)
	}

	const handleCloseModal = () => {
		setShowModal(false)
		setIsProcessing(false)
		setIsPurchased(false)
		clearCart()
	}

	const completePurchase = () => {
		setIsProcessing(true)

		// Simulamos un proceso de pago
		setTimeout(() => {
			setIsProcessing(false)
			setIsPurchased(true)
		}, 2000)
	}

	return (
		<div className='w-full lg:w-1/3 mt-6 lg:mt-0'>
			<div className='bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-20'>
				<h2 className='text-xl font-bold text-gray-800 mb-6'>
					Resumen del pedido
				</h2>

				{/* En tablet, hacer un layout horizontal para aprovechar el espacio */}
				<div className='md:grid md:grid-cols-2 md:gap-4 lg:block'>
					<div className='md:space-y-2 lg:space-y-0'>
						<div className='flex justify-between mb-2'>
							<span className='text-gray-600'>Subtotal</span>
							<span className='text-gray-800 font-medium'>
								${subtotal.toFixed(2)}
							</span>
						</div>

						<div className='flex justify-between mb-2'>
							<span className='text-gray-600'>Impuestos (19%)</span>
							<span className='text-gray-800 font-medium'>
								${tax.toFixed(2)}
							</span>
						</div>
					</div>

					<div className='md:border-l md:pl-4 lg:border-l-0 lg:pl-0 md:mt-0 lg:mt-4'>
						<div className='border-t border-gray-200 md:border-t-0 lg:border-t mt-4 pt-4 md:pt-0 lg:pt-4 md:mt-0'>
							<div className='flex justify-between mb-4'>
								<span className='text-gray-800 font-bold'>Total</span>
								<span className='text-indigo-600 font-bold text-xl'>
									${total.toFixed(2)}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Botones de acción - ancho completo en todas las pantallas */}
				<button
					className='button-keyboard w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors mt-4'
					onClick={handlePayment}
				>
					Proceder al pago
				</button>

				<div className='mt-4 text-center'>
					<Link
						to='/brands'
						className='text-indigo-600 hover:text-indigo-800 text-sm'
					>
						Continuar comprando
					</Link>
				</div>
			</div>

			{/* Modal del Ticket de Venta */}
			{showModal && (
				<Modal showModal={showModal} closeModal={closeModal}>
					{/* Cabecera del Modal */}
					<div className='p-4 bg-indigo-600 text-white flex justify-between items-center'>
						<h3 className='text-lg font-bold flex items-center'>
							<FaReceipt className='mr-2' /> Detalle de Compra
						</h3>
						<button
							onClick={closeModal}
							className='text-white hover:text-gray-200'
							aria-label='Cerrar'
						>
							<FaTimes size={20} />
						</button>
					</div>

					{/* Contenido del Ticket */}
					<div className='p-6'>
						{!isPurchased ? (
							<TicketShop
								closeModal={closeModal}
								completePurchase={completePurchase}
								isProcessing={isProcessing}
								subtotal={subtotal}
								tax={tax}
								total={total}
								orderNumber={orderNumber}
								today={today}
							/>
						) : (
							<TicketExit
								handleCloseModal={handleCloseModal}
								orderNumber={orderNumber}
							/>
						)}
					</div>

					{!isPurchased && (
						<div className='px-6 pb-6 text-center'>
							<p className='text-xs text-gray-500'>
								Al confirmar tu compra, aceptas nuestros términos y condiciones.
							</p>
						</div>
					)}
				</Modal>
			)}
		</div>
	)
}

export default Payment
