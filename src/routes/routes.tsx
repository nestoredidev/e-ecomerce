import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Brands from '../pages/Brands'
import Cart from '../pages/Cart'
import Home from '../pages/Home'
import Offers from '../pages/Offers'
import ProductDetails from '../pages/ProductDetails'
import NotFound from '../components/ui/NotFound'

function MyRoutes() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/product/:id' element={<ProductDetails />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/brands' element={<Brands />} />
				<Route path='/on-sale' element={<Offers />} />
				<Route path='/*' element={<NotFound />} />
			</Routes>
		</Router>
	)
}

export default MyRoutes
