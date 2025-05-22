export interface Product {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
	rating: {
		rate: number
		count: number
	}
	originalPrice?: number
	discountPercent?: number
}

export type Category = {
	id: string // ID es string en tu función fechProductCategory
	name: string
	image: string
	count?: number // Propiedad adicional que tienes en fechProductCategory
}
