import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { CartItem } from '../../context/useStore'
import QuantitySelector from './QuantitySelector'

type CartMobileViewProps = {
	cart: CartItem[]
	updateCartItemQuantity: (productId: number, quantity: number) => void
	removeFromCart: (productId: number) => void
}

const CartMobileView: React.FC<CartMobileViewProps> = ({
	cart,
	updateCartItemQuantity,
	removeFromCart,
}) => {
	return (
		<div className='md:hidden max-h-[60vh] overflow-y-auto px-4 py-2'>
			{cart.map(item => (
				<div
					key={item.id}
					className='border-b border-gray-200 py-4 last:border-b-0'
				>
					<div className='flex items-start'>
						<div className='h-20 w-20 flex-shrink-0'>
							<img
								className='h-20 w-20 object-contain'
								src={item.image}
								alt={item.title}
							/>
						</div>
						<div className='ml-4 flex-1'>
							<div className='flex justify-between'>
								<div className='text-sm font-medium text-gray-900 pr-2 mb-1'>
									{item.title}
								</div>
								<button
									onClick={() => removeFromCart(item.id)}
									className='text-red-600 hover:text-red-900 ml-2'
									aria-label='Remove item'
								>
									<FaTrash size={14} />
								</button>
							</div>
							<div className='text-sm text-gray-600 mb-3'>
								${item.price.toFixed(2)}
							</div>
							<div className='flex justify-between items-center'>
								<QuantitySelector
									quantity={item.quantity}
									onIncrease={() =>
										updateCartItemQuantity(item.id, item.quantity + 1)
									}
									onDecrease={() =>
										updateCartItemQuantity(item.id, item.quantity - 1)
									}
									size='medium'
								/>
								<div className='text-sm font-bold text-indigo-600'>
									${(item.price * item.quantity).toFixed(2)}
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default CartMobileView
