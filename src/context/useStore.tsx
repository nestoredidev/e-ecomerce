import React, { createContext, useState, useCallback, useEffect } from 'react'
import { Category, Product } from '../types/product'

// Definir la interfaz del item del carrito
export interface CartItem extends Product {
	quantity: number
}

// Definir el tipo de notificación
export type Notification = {
	id: string
	message: string
	type: 'success' | 'error' | 'info'
}

// Actualizar el contexto para incluir el carrito y notificaciones
export const storeContext = createContext<{
	products: Product[]
	randomProduct: Product | undefined
	loading: boolean
	fetchProducts: () => Promise<void>
	fetchRandomProduct: () => Promise<void>
	uniqueProdcut: Product | undefined
	productCategory: Category[]
	fechProductCategory: () => Promise<void>
	fechUniqueProdcut: (id: string) => Promise<void>
	cart: CartItem[]
	addToCart: (product: Product, quantity?: number) => void
	removeFromCart: (productId: number) => void
	updateCartItemQuantity: (productId: number, quantity: number) => void
	clearCart: () => void
	totalItems: number
	notifications: Notification[]
	addNotification: (message: string, type: 'success' | 'error' | 'info') => void
	removeNotification: (id: string) => void
}>({
	products: [],
	loading: false,
	fetchProducts: async () => {},
	fetchRandomProduct: async () => {},
	randomProduct: undefined,
	productCategory: [],
	fechProductCategory: async () => {},
	uniqueProdcut: undefined,
	fechUniqueProdcut: async () => {},
	cart: [],
	addToCart: () => {},
	removeFromCart: () => {},
	updateCartItemQuantity: () => {},
	clearCart: () => {},
	totalItems: 0,
	notifications: [],
	addNotification: () => {},
	removeNotification: () => {},
})

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(false)
	const [randomProduct, setRandomProduct] = useState<Product | undefined>(
		undefined
	)
	const [productCategory, setProductCategory] = useState<Category[]>([])
	const [uniqueProdcut, setUniqueProdcut] = useState<Product>()

	// Estado para el carrito
	const [cart, setCart] = useState<CartItem[]>(() => {
		// Inicializar desde localStorage si existe
		const savedCart = localStorage.getItem('cart')
		return savedCart ? JSON.parse(savedCart) : []
	})

	// Estado para notificaciones
	const [notifications, setNotifications] = useState<Notification[]>([])

	// Calcular el total de items en el carrito
	const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

	// Guardar el carrito en localStorage cuando cambie
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	// Función para añadir notificación
	const addNotification = useCallback(
		(message: string, type: 'success' | 'error' | 'info' = 'info') => {
			const id = Date.now().toString()
			setNotifications(prev => [...prev, { id, message, type }])

			// Auto-eliminar después de 3 segundos
			setTimeout(() => {
				removeNotification(id)
			}, 3000)
		},
		[]
	)

	// Función para eliminar notificación
	const removeNotification = useCallback((id: string) => {
		setNotifications(prev =>
			prev.filter(notification => notification.id !== id)
		)
	}, [])

	// Función para añadir un producto al carrito
	const addToCart = useCallback(
		(product: Product, quantity = 1) => {
			setCart(currentCart => {
				// Verificar si el producto ya está en el carrito
				const existingItem = currentCart.find(item => item.id === product.id)

				if (existingItem) {
					// Si existe, actualizar cantidad
					addNotification(
						`Se actualizó la cantidad de "${product.title}" en el carrito`,
						'success'
					)
					return currentCart.map(item =>
						item.id === product.id
							? { ...item, quantity: item.quantity + quantity }
							: item
					)
				} else {
					// Si no existe, añadir nuevo item
					addNotification(`Se añadió "${product.title}" al carrito`, 'success')
					return [...currentCart, { ...product, quantity }]
				}
			})
		},
		[addNotification]
	)

	// Función para eliminar un producto del carrito
	const removeFromCart = useCallback((productId: number) => {
		setCart(currentCart => currentCart.filter(item => item.id !== productId))
	}, [])

	// Función para actualizar la cantidad de un producto en el carrito
	const updateCartItemQuantity = useCallback(
		(productId: number, quantity: number) => {
			if (quantity <= 0) {
				// Si la cantidad es 0 o menor, eliminar del carrito
				removeFromCart(productId)
				return
			}

			setCart(currentCart =>
				currentCart.map(item =>
					item.id === productId ? { ...item, quantity } : item
				)
			)
		},
		[removeFromCart]
	)

	// Función para vaciar el carrito
	const clearCart = useCallback(() => {
		setCart([])
	}, [])

	const fetchProducts = useCallback(async () => {
		try {
			setLoading(true)
			const response = await fetch('https://fakestoreapi.com/products')
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			const data = await response.json()
			setProducts(data)
		} catch (error) {
			console.error('Error fetching products:', error)
			throw new Error('Error fetching products: ' + error)
		} finally {
			setLoading(false)
		}
	}, [])

	const fetchRandomProduct = useCallback(async () => {
		try {
			setLoading(true)

			const randomId = Math.floor(Math.random() * 20) + 1

			try {
				const response = await fetch(
					`https://fakestoreapi.com/products/${randomId}`
				)
				if (response.ok) {
					const product = await response.json()
					setRandomProduct(product)
					return
				}
			} catch (e) {
				console.log(
					'No se pudo obtener producto por ID aleatorio, intentando método alternativo' +
						e
				)
			}

			if (products.length === 0) {
				const allResponse = await fetch('https://fakestoreapi.com/products')
				if (allResponse.ok) {
					const allProducts = await allResponse.json()
					if (allProducts.length > 0) {
						const index = Math.floor(Math.random() * allProducts.length)
						setRandomProduct(allProducts[index])
					}
				}
			} else {
				const index = Math.floor(Math.random() * products.length)
				setRandomProduct(products[index])
			}
		} catch (error) {
			console.error('Error al obtener producto aleatorio:', error)
		} finally {
			setLoading(false)
		}
	}, [products.length])

	const fechProductCategory = useCallback(async () => {
		try {
			setLoading(true)

			let categoriesWithImages: Category[] = []

			try {
				const categoryResponse = await fetch(
					'https://fakestoreapi.com/products/categories'
				)
				if (categoryResponse.ok) {
					const categories = await categoryResponse.json()

					categoriesWithImages = categories.map((categoryName: string) => ({
						id: categoryName,
						name: categoryName,
						image: `https://fakestoreapi.com/products/category/${categoryName}`,
						count: 0,
					}))
				}
			} catch (e) {
				console.error('Error fetching categories:', e)
			}

			let productsForCount = products
			if (productsForCount.length === 0) {
				try {
					const productsResponse = await fetch(
						'https://fakestoreapi.com/products'
					)
					if (productsResponse.ok) {
						productsForCount = await productsResponse.json()
					}
				} catch (e) {
					console.error('Error fetching products for category count:', e)
				}
			}

			const updatedCategories = categoriesWithImages.map(
				(category: Category) => {
					const count = productsForCount.filter(
						product => product.category === category.id
					).length

					return {
						...category,
						count,
					}
				}
			)

			setProductCategory(updatedCategories)
		} catch (error) {
			console.error('Error fetching product categories:', error)
			throw new Error('Error fetching product categories: ' + error)
		} finally {
			setLoading(false)
		}
	}, [products.length])

	const fechUniqueProdcut = useCallback(async (id: string) => {
		try {
			setLoading(true)
			const response = await fetch(`https://fakestoreapi.com/products/${id}`)
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			const data = await response.json()
			setUniqueProdcut(data)
		} catch (error) {
			console.error('Error fetching unique product:', error)
			throw new Error('Error fetching unique product: ' + error)
		} finally {
			setLoading(false)
		}
	}, [])

	return (
		<storeContext.Provider
			value={{
				products,
				loading,
				randomProduct,
				productCategory,
				fetchProducts,
				fetchRandomProduct,
				fechProductCategory,
				fechUniqueProdcut,
				uniqueProdcut,
				cart,
				addToCart,
				removeFromCart,
				updateCartItemQuantity,
				clearCart,
				totalItems,
				notifications,
				addNotification,
				removeNotification,
			}}
		>
			{children}
		</storeContext.Provider>
	)
}
