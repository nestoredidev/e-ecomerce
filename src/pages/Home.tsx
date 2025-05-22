import { useContext, useEffect } from 'react'
import Cardoffer from '../components/CardOffer'
import CardProduct from '../components/CardProduct'
import CategorySlider from '../components/CategorySlider'
import Layout from '../components/Layout'
import { storeContext } from '../context/useStore'
import { Product } from '../types/product'

function Home() {
	const {
		randomProduct: offerProduct,
		products,
		fetchRandomProduct,
		fetchProducts,
		fechProductCategory,
		productCategory,
	} = useContext(storeContext)

	useEffect(() => {
		fetchProducts()
		fechProductCategory()
		fetchRandomProduct()
	}, [])

	if (!products || !offerProduct) {
		return <div>Cargando...</div>
	}
	return (
		<Layout>
			<div className='container mx-auto px-2 py-4'>
				{/* Banner promocional con producto destacado */}
				<div className='mt-0 mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg overflow-hidden shadow-md'>
					<Cardoffer
						id={offerProduct.id}
						title={offerProduct.title}
						description={offerProduct.description}
						price={offerProduct.price}
						image={offerProduct.image}
					/>
				</div>

				<CategorySlider categories={productCategory} />
				<div>
					<h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
						Productos en tendencias
					</h1>

					{/* Grid de productos responsivo */}
					<section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{products.map((product: Product) => (
							<CardProduct
								key={product.id}
								image={product.image}
								price={product.price}
								title={product.title}
								id={product.id}
							/>
						))}
					</section>
				</div>
				<div></div>
			</div>
		</Layout>
	)
}

export default Home
