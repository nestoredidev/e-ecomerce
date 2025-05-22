import React, { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	variant?: ButtonVariant
	size?: ButtonSize
	fullWidth?: boolean
	isLoading?: boolean
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
}

function Button({
	children,
	variant = 'primary',
	size = 'md',
	fullWidth = false,
	isLoading = false,
	leftIcon,
	rightIcon,
	className = '',
	disabled,
	...rest
}: ButtonProps) {
	// Definir clases base para todas las variantes
	const baseClasses =
		'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

	// Clases según la variante
	const variantClasses = {
		primary:
			'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
		secondary:
			'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
		outline:
			'bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
		danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
		success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
	}

	// Clases según el tamaño
	const sizeClasses = {
		sm: 'text-xs px-3 py-2',
		md: 'text-sm px-4 py-2',
		lg: 'text-base px-6 py-3',
	}

	// Clases cuando está deshabilitado o cargando
	const disabledClasses =
		disabled || isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'

	// Clases para ancho completo
	const widthClasses = fullWidth ? 'w-full' : ''

	return (
		<button
			className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${widthClasses}
        ${className}
      `}
			disabled={disabled || isLoading}
			{...rest}
		>
			{isLoading && (
				<svg
					className='animate-spin -ml-1 mr-2 h-4 w-4 text-current'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
				>
					<circle
						className='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						strokeWidth='4'
					></circle>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
					></path>
				</svg>
			)}

			{leftIcon && !isLoading && <span className='mr-2'>{leftIcon}</span>}
			{children}
			{rightIcon && <span className='ml-2'>{rightIcon}</span>}
		</button>
	)
}

export default Button
