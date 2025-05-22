import React from 'react'

interface ModalProps {
	showModal: boolean
	closeModal: () => void
	children: React.ReactNode
}

function Modal({ showModal, closeModal, children }: ModalProps) {
	if (!showModal) return null

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeModal()
		}
	}

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/90 bg-opacity-80 animate-fadeIn'
			onClick={handleBackdropClick}
		>
			<div className='relative bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden'>
				{children}
			</div>
		</div>
	)
}

export default Modal
