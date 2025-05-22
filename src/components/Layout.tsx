import { ReactNode } from 'react'
import Nabar from './Nabar'

type LayoutProps = {
	children: ReactNode
}

function Layout({ children }: LayoutProps) {
	return (
		<div className='flex flex-col min-h-screen'>
			<Nabar />
			<main className='flex-grow container mx-auto px-2 py-4'>{children}</main>
			<footer className='bg-gray-100 py-6'>
				<div className='container mx-auto px-4 text-center text-gray-600'>
					<p>
						© {new Date().getFullYear()} TiendaLinea. Todos los derechos
						reservados.
					</p>
				</div>
			</footer>
		</div>
	)
}

export default Layout
