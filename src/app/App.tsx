import './App.css'
import { AppLayout } from './providers/layout/layout/Header'
import { RoutesProvider } from './providers/routes'

export function App() {
   return <RoutesProvider layout={<AppLayout />} />
}
