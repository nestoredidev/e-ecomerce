import { useContext } from 'react'
import Layout from '../components/Layout'
import { storeContext } from '../context/useStore'
import CartDesktopView from '../components/cart/CartDesktopView'
import CartMobileView from '../components/cart/CartMobileView'
import CartEmpty from '../components/cart/CartEmpty'
import ClearCart from '../components/cart/ClearCart'
import Payment from '../components/cart/Payment'

function Cart() {
	const { cart, removeFromCart, updateCartItemQuantity, clearCart } =
		useContext(storeContext)

	// Calcular el subtotal
	const subtotal = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	)

	const tax = subtotal * 0.19

	const total = subtotal + tax

	return (
		<Layout>
			<div className='container mx-auto px-4 py-8'>
				<h1 className='text-2xl font-bold text-gray-800 mb-8 text-center sm:text-left'>
					Carrito de Compras
				</h1>

				{cart.length === 0 ? (
					<CartEmpty />
				) : (
					<div className='flex flex-col lg:flex-row gap-6'>
						<div className='w-full lg:w-2/3'>
							<div className='bg-white rounded-lg shadow-md overflow-hidden'>
								<CartDesktopView
									cart={cart}
									updateCartItemQuantity={updateCartItemQuantity}
									removeFromCart={removeFromCart}
								/>

								<CartMobileView
									cart={cart}
									updateCartItemQuantity={updateCartItemQuantity}
									removeFromCart={removeFromCart}
								/>

								<ClearCart subtotal={subtotal} clearCart={clearCart} />
							</div>
						</div>

						<Payment subtotal={subtotal} tax={tax} total={total} />
					</div>
				)}
			</div>
		</Layout>
	)
}

export default Cart
