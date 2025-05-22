import { FaCheck } from 'react-icons/fa'

interface TicketExit {
	orderNumber: string
	handleCloseModal: () => void
}

function TicketExit({ orderNumber, handleCloseModal }: TicketExit) {
	return (
		<div className='text-center py-6'>
			<div className='mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4'>
				<FaCheck size={30} />
			</div>
			<h3 className='text-xl font-bold text-gray-800 mb-2'>¡Compra Exitosa!</h3>
			<p className='text-gray-600 mb-6'>
				Tu pedido #{orderNumber} ha sido procesado correctamente.
			</p>
			<div className='animate-pulse text-sm text-gray-500 mb-6'>
				Te hemos enviado un correo con los detalles de tu compra.
			</div>
			<button
				onClick={handleCloseModal}
				className='button-keyboard w-full py-3 px-4 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors'
			>
				Cerrar
			</button>
		</div>
	)
}

export default TicketExit
