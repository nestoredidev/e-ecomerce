import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { CartItem } from '../../context/useStore'
import QuantitySelector from './QuantitySelector'

type CartDesktopViewProps = {
	cart: CartItem[]
	updateCartItemQuantity: (productId: number, quantity: number) => void
	removeFromCart: (productId: number) => void
}

const CartDesktopView: React.FC<CartDesktopViewProps> = ({
	cart,
	updateCartItemQuantity,
	removeFromCart,
}) => {
	return (
		<div className='hidden md:block max-h-[500px] overflow-y-auto'>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50 sticky top-0 z-10'>
					<tr>
						<th className='px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Producto
						</th>
						<th className='px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Precio
						</th>
						<th className='px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Cantidad
						</th>
						<th className='px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Total
						</th>
						<th className='px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{cart.map(item => (
						<tr key={item.id}>
							<td className='px-3 sm:px-6 py-4 whitespace-normal'>
								<div className='flex items-center'>
									<div className='h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0'>
										<img
											className='h-full w-full object-contain'
											src={item.image}
											alt={item.title}
										/>
									</div>
									<div className='ml-2 sm:ml-4'>
										<div className='text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[150px] sm:max-w-[200px] md:max-w-[250px]'>
											{item.title}
										</div>
									</div>
								</div>
							</td>
							<td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
								<div className='text-xs sm:text-sm text-gray-900'>
									${item.price.toFixed(2)}
								</div>
							</td>
							<td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
								<QuantitySelector
									quantity={item.quantity}
									onIncrease={() =>
										updateCartItemQuantity(item.id, item.quantity + 1)
									}
									onDecrease={() =>
										updateCartItemQuantity(item.id, item.quantity - 1)
									}
									size='small'
								/>
							</td>
							<td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
								<div className='text-xs sm:text-sm text-gray-900 font-medium'>
									${(item.price * item.quantity).toFixed(2)}
								</div>
							</td>
							<td className='px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
								<button
									onClick={() => removeFromCart(item.id)}
									className='text-red-600 hover:text-red-900'
									aria-label='Remove item'
								>
									<FaTrash size={14} className='sm:text-sm' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default CartDesktopView
