// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { StoreProvider } from './context/useStore.tsx'

createRoot(document.getElementById('root')!).render(
	// <StrictMode>
	<StoreProvider>
		<App />
	</StoreProvider>
	// </StrictMode>
)
