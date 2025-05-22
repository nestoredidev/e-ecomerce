import { useContext } from 'react'
import {
	FaCheckCircle,
	FaExclamationCircle,
	FaInfoCircle,
	FaTimes,
} from 'react-icons/fa'
import { storeContext } from '../../context/useStore'

const Notifications = () => {
	const { notifications, removeNotification } = useContext(storeContext)

	if (notifications.length === 0) return null

	return (
		<div className='fixed top-20 right-4 z-50 w-72 space-y-2'>
			{notifications.map(notification => (
				<div
					key={notification.id}
					className={`rounded-lg shadow-lg px-4 py-3 flex items-start gap-2 animate-fadeIn ${
						notification.type === 'success'
							? 'bg-green-100 text-green-800'
							: notification.type === 'error'
							? 'bg-red-100 text-red-800'
							: 'bg-blue-100 text-blue-800'
					}`}
				>
					<div className='flex-shrink-0 pt-0.5'>
						{notification.type === 'success' ? (
							<FaCheckCircle />
						) : notification.type === 'error' ? (
							<FaExclamationCircle />
						) : (
							<FaInfoCircle />
						)}
					</div>

					<p className='text-sm flex-1'>{notification.message}</p>

					<button
						onClick={() => removeNotification(notification.id)}
						className='text-gray-500 hover:text-gray-700'
						aria-label='Cerrar'
					>
						<FaTimes size={14} />
					</button>
				</div>
			))}
		</div>
	)
}

export default Notifications
