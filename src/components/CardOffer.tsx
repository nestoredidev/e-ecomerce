import { Link } from 'react-router-dom'
import Button from './ui/Buttons'

interface CardOfferProps {
	id: number | string
	title: string
	description: string
	price: number
	image: string
}

function Cardoffer({ id, title, description, price, image }: CardOfferProps) {
	return (
		<div className='md:flex items-center'>
			<div className='md:w-1/2 p-8 text-left'>
				<span className='inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold mb-4'>
					OFERTA ESPECIAL
				</span>
				<h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
					{title}
				</h2>
				<p className='text-gray-600 mb-4 line-clamp-2'>{description}</p>
				<div className='flex items-center mb-6'>
					<span className='text-3xl font-bold text-indigo-600'>
						${price.toFixed(2)}
					</span>
					<span className='ml-3 text-lg text-gray-500 line-through'>
						${(price * 1.2).toFixed(2)}
					</span>
				</div>
				<Link to={`/product/${id}`}>
					<Button variant='primary' size='lg' rightIcon={<span>→</span>}>
						Ver detalles
					</Button>
				</Link>
			</div>
			<div className='md:w-1/2 h-64 md:h-80'>
				<img
					src={image}
					alt={title}
					className='w-full h-full rounded-md p-1 object-cover'
				/>
			</div>
		</div>
	)
}

export default Cardoffer
