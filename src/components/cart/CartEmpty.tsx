import React from 'react'
import { Link } from 'react-router-dom'

const CartEmpty: React.FC = () => {
	return (
		<div className='bg-white rounded-lg shadow-md p-8 text-center'>
			<p className='text-gray-600 mb-4'>Tu carrito está vacío</p>
			<Link
				to='/brands'
				className='inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors'
			>
				Explorar productos
			</Link>
		</div>
	)
}

export default CartEmpty
