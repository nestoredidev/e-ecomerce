import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

type QuantitySelectorProps = {
	quantity: number
	onIncrease: () => void
	onDecrease: () => void
	size?: 'small' | 'medium' | 'large'
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
	quantity,
	onIncrease,
	onDecrease,
	size = 'medium',
}) => {
	// Configuración de tamaños
	const sizeClasses = {
		small: {
			button: 'px-1 sm:px-2 py-1',
			text: 'px-2 sm:px-4 py-1 text-xs sm:text-sm',
			icon: 10,
		},
		medium: {
			button: 'px-2 py-1',
			text: 'px-3 py-1 text-sm',
			icon: 12,
		},
		large: {
			button: 'px-3 py-2',
			text: 'px-4 py-1 text-base',
			icon: 14,
		},
	}

	const { button, text, icon } = sizeClasses[size]

	return (
		<div className='flex items-center border border-gray-300 rounded-md w-min'>
			<button
				onClick={onDecrease}
				disabled={quantity <= 1}
				className={`${button} text-gray-600 hover:bg-gray-100 disabled:opacity-50`}
				aria-label='Reduce quantity'
			>
				<FaMinus size={icon} />
			</button>
			<span className={text}>{quantity}</span>
			<button
				onClick={onIncrease}
				className={`${button} text-gray-600 hover:bg-gray-100`}
				aria-label='Increase quantity'
			>
				<FaPlus size={icon} />
			</button>
		</div>
	)
}

export default QuantitySelector
